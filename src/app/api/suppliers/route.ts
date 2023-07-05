import sharp from 'sharp';
import multer from 'multer';

import { prisma } from '~/lib/prisma';
import { uploadFile } from '~/lib/aws';
import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/lib/utils';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async (request: NextRequest) => {
    try {
        console.log('Received data:', request.body);
        const data = await request.json();

        const logoBuffer = await sharp(data.logo_image.buffer).toBuffer();

        const marketingBuffer = await sharp(
            data.marketing_image.buffer
        ).toBuffer();

        const logoImageResponse = await uploadFile(
            logoBuffer,
            data.logo_image_name,
            data.logo_image_type
        );
        console.log(logoImageResponse);

        const marketingImageResponse = await uploadFile(
            marketingBuffer,
            data.marketing_image_name,
            data.marketing_image_type
        );
        console.log(logoImageResponse);

        upload.single('logo_image');
        upload.single('marketing_image');

        const supplier = await prisma.supplier.create({
            data: {
                name: data.name,
                logo_image: logoImageResponse,
                marketing_image: marketingImageResponse,
                description: data.description,
                social_facebook: data.social_facebook,
                social_twitter: data.social_twitter,
                social_instagram: data.social_instagram,
                social_youtube: data.social_youtube,
                social_linkedin: data.social_linkedin,
                social_website: data.social_website,
            },
        });

        console.log(NextResponse.json(supplier));
        console.log(supplier);
        return NextResponse.json(supplier);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
