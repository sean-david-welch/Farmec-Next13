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
                name: data.name,
                description: data.description,
                logo_image: logoUrl,
                marketing_image: marketingUrl,
                social_facebook: data.social_facebook,
                social_twitter: data.social_twitter,
                social_instagram: data.social_instagram,
                social_youtube: data.social_youtube,
                social_linkedin: data.social_linkedin,
                social_website: data.social_website,
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

        if (logoId) {
            await deleteFromCloudinary(logoId);
        }
        if (marketingId) {
            await deleteFromCloudinary(marketingId);
        }

        const project = await prisma.supplier.delete({
            where: {
                id: id,
            },
            select: { logo_image: true, marketing_image: true },
        });
        console.log('project deleted');

        return NextResponse.json(project);
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
