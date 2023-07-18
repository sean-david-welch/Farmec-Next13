import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary, deleteFromCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Suppliers';

        const {
            name,
            description,
            logo_image,
            marketing_image,
            social_facebook,
            social_instagram,
            social_linkedin,
            social_twitter,
            social_youtube,
            social_website,
        } = data;

        if (!logo_image) {
            throw new Error('Logo image not found');
        }

        if (!marketing_image) {
            throw new Error('Marketing image not found');
        }

        const {
            url: logoUrl,
            signature: logoSignature,
            timestamp: logoTimestamp,
        } = await uploadToCloudinary(data.logo_image, folder);
        const {
            url: marketingUrl,
            signature: marketingSignature,
            timestamp: marketingTimestamp,
        } = await uploadToCloudinary(data.marketing_image, folder);

        const supplier = await prisma.supplier.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                logo_image: logoUrl,
                marketing_image: marketingUrl,
                social_facebook: social_facebook,
                social_twitter: social_twitter,
                social_instagram: social_instagram,
                social_youtube: social_youtube,
                social_linkedin: social_linkedin,
                social_website: social_website,
            },
        });

        return NextResponse.json({
            supplier,
            logoSignature,
            logoTimestamp,
            marketingSignature,
            marketingTimestamp,
            folder,
        });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: id,
            },
        });

        if (!supplier) {
            return errorResponse(404, 'Supplier not found');
        }

        const { logo_image, marketing_image } = supplier;

        const logoId = logo_image?.split('/').pop()?.split('.')[0] ?? '';
        const marketingId =
            marketing_image?.split('/').pop()?.split('.')[0] ?? '';

        await prisma.supplier.delete({
            where: {
                id: id,
            },
        });

        if (logoId) {
            await deleteFromCloudinary(logoId);
        } else {
            console.log('Logo image not found');
        }

        if (marketingId) {
            await deleteFromCloudinary(marketingId);
        } else {
            console.log('Marketing image not found');
        }

        return NextResponse.json({
            message: 'Supplier deleted',
        });
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
