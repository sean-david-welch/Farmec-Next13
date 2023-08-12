import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';

export const GET = async () => {
    const suppliers = await prisma.supplier.findMany({});

    return NextResponse.json(suppliers);
};

export const POST = async (request: NextRequest) => {
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

        const supplier = await prisma.supplier.create({
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
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
