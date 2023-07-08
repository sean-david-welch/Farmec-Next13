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
        const data = await request.json();
        const body = await request.formData();

        const {
            name,
            description,
            social_facebook,
            social_twitter,
            social_instagram,
            social_youtube,
            social_linkedin,
            social_website,
        } = data;

        const logo_image = body.get('logo_image');
        const marketing_image = body.get('marketing_image');

        const timestamp = Math.round(new Date().getTime() / 1000);

        const logoSignature = cloudinary.utils.api_sign_request(
            { timestamp: timestamp },
            process.env.CLOUDINARY_PRIVATE!
        );

        const logoUploadUrl = cloudinary.url(`${name}${logo_image}`, {
            sign_url: true,
            timestamp: timestamp,
            signature: logoSignature,
        });

        const marketingSignature = cloudinary.utils.api_sign_request(
            { timestamp: timestamp },
            process.env.CLOUDINARY_PRIVATE!
        );

        const marketingUploadUrl = cloudinary.url(`${name}${marketing_image}`, {
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

        return NextResponse.json(supplier);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
