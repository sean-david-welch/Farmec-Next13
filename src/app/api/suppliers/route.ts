import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/lib/utils';

import { generateUploadURL, bucketName } from '~/lib/aws';

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();

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

        if (!bucketName) return errorResponse(500, 'Bucket name not found');

        const logo_image_data = await generateUploadURL(bucketName, logo_image);
        const marketing_image_data = await generateUploadURL(
            bucketName,
            marketing_image
        );

        const supplier = await prisma.supplier.create({
            data: {
                name,
                description,
                logo_image: logo_image_data.publicUrl,
                marketing_image: marketing_image_data.publicUrl,
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
