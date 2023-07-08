import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/utils';
import cloudinary, { cloudinaryConfig } from '~/lib/cloudinary';

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        console.log(data);

        const {
            name,
            description,
            logo_image,
            marketing_image,
            social_facebook,
            social_twitter,
            social_instagram,
            social_youtube,
            social_linkedin,
            social_website,
        } = data;

        const timestamp = Math.round(new Date().getTime() / 1000);

        if (!cloudinaryConfig.api_secret) {
            throw new Error('Missing credentials for cloudinary');
        }

        const logoSignature = cloudinary.utils.api_sign_request(
            { timestamp: timestamp },
            cloudinaryConfig.api_secret
        );

        const marketingSignature = cloudinary.utils.api_sign_request(
            { timestamp: timestamp },
            cloudinaryConfig.api_secret
        );

        const logoUploadUrl = cloudinary.url(logo_image, {
            sign_url: true,
            timestamp: timestamp,
            signature: logoSignature,
        });

        const marketingUploadUrl = cloudinary.url(marketing_image, {
            sign_url: true,
            timestamp: timestamp,
            signature: marketingSignature,
        });

        const supplier = await prisma.supplier.create({
            data: {
                name,
                description,
                logo_image: logoUploadUrl,
                marketing_image: marketingUploadUrl,
                social_facebook,
                social_twitter,
                social_instagram,
                social_youtube,
                social_linkedin,
                social_website,
            },
        });

        return NextResponse.json({
            supplier,
            logoSignature,
            marketingSignature,
            timestamp,
        });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
