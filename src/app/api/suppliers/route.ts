import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary } from '~/lib/cloudinary';

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
            url: logoUrl,
            signature: logoSignature,
            timestamp: logoTimestamp,
        } = await uploadToCloudinary(data.logo_image, folder);
        const {
            url: marketingUrl,
            signature: marketingSignature,
            timestamp: marketingTimestamp,
        } = await uploadToCloudinary(data.marketing_image, folder);

        const supplier = await prisma.supplier.create({
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
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
