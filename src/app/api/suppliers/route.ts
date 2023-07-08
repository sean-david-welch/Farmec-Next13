import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/utils';
import cloudinary from '~/lib/cloudinary';

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.formData();

        const name = body.get('name') as string;
        const logo_image = body.get('logo_image') as string;
        const marketing_image = body.get('marketing_image') as string;
        const description = body.get('description') as string;
        const social_facebook = body.get('social_facebook') as string;
        const social_twitter = body.get('social_twitter') as string;
        const social_instagram = body.get('social_instagram') as string;
        const social_youtube = body.get('social_youtube') as string;
        const social_linkedin = body.get('social_linkedin') as string;
        const social_website = body.get('social_website') as string;

        console.log(typeof logo_image);

        const timestamp = Math.round(new Date().getTime() / 1000);

        const logoSignature = cloudinary.utils.api_sign_request(
            { timestamp: timestamp },
            process.env.CLOUDINARY_PRIVATE!
        );

        const marketingSignature = cloudinary.utils.api_sign_request(
            { timestamp: timestamp },
            process.env.CLOUDINARY_PRIVATE!
        );

        console.log(logoSignature);
        console.log(marketingSignature);

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

        console.log(logoUploadUrl);
        console.log(marketingUploadUrl);

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
