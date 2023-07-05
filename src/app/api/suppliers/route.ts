import { prisma } from '~/lib/prisma';
import { uploadFile } from '~/lib/aws';
import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/lib/utils';

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        const body = await request.formData();

        console.log('data', data);
        console.log('body', body);

        const logoImage = data.logo_image as File;
        const marketingImage = data.marketing_image as File;

        if (!logoImage || !marketingImage) {
            return errorResponse(400, 'Missing image');
        }

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

        const logoImageResponse = await uploadFile(
            logoImage,
            data.logo_image_name,
            data.logo_image_type
        );
        console.log(logoImageResponse);

        const marketingImageResponse = await uploadFile(
            marketingImage,
            data.marketing_image_name,
            data.marketing_image_type
        );
        console.log(logoImageResponse);

        const supplier = await prisma.supplier.create({
            data: {
                name,
                description,
                logo_image: logoImageResponse,
                marketing_image: marketingImageResponse,
                social_facebook,
                social_twitter,
                social_instagram,
                social_youtube,
                social_linkedin,
                social_website,
            },
        });

        console.log(NextResponse.json(supplier));
        console.log(supplier);
        return NextResponse.json(supplier);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
