import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl, deleteFromCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Suppliers';

        const existingImages = await prisma.supplier.findUnique({
            where: {
                id: id,
            },
            select: {
                logo_image: true,
                marketing_image: true,
            },
        });

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

        let logoUrl: string | undefined = undefined;
        let logoSignature, logoTimestamp;

        let marketingUrl: string | undefined = undefined;
        let marketingSignature, marketingTimestamp;

        if (logo_image) {
            const { url, signature, timestamp } = await getCloudinaryUrl(
                data.logo_image,
                folder
            );

            logoUrl = url;
            logoSignature = signature;
            logoTimestamp = timestamp;
        }

        if (marketing_image) {
            const { url, signature, timestamp } = await getCloudinaryUrl(
                data.marketing_image,
                folder
            );

            marketingUrl = url;
            marketingSignature = signature;
            marketingTimestamp = timestamp;
        }

        const supplier = await prisma.supplier.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                logo_image: logoUrl ? logoUrl : existingImages?.logo_image,
                marketing_image: marketingUrl
                    ? marketingUrl
                    : existingImages?.marketing_image,
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

        await prisma.supplier.delete({
            where: {
                id: id,
            },
        });

        if (logo_image) {
            await deleteFromCloudinary(logo_image);
        } else {
            throw new Error('Logo image not found');
        }

        if (marketing_image) {
            await deleteFromCloudinary(marketing_image);
        } else {
            throw new Error('Marketing image not found');
        }

        return NextResponse.json({
            message: 'Supplier deleted',
        });
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
