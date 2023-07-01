import { prisma } from '~/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/lib/utils';

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async (request: NextRequest) => {
    try {
        await validateUser(request);
        const data = await request.json();

        const supplier = await prisma.supplier.create({
            data: {
                name: data.name,
                logo_image: data.logo_image,
                marketing_image: data.marketing_image,
                description: data.description,
                social_facebook: data.social_facebook,
                social_twitter: data.social_twitter,
                social_instagram: data.social_instagram,
                social_youtube: data.social_youtube,
                social_linkedin: data.social_linkedin,
                social_website: data.social_website,
            },
        });

        return NextResponse.json(supplier);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
