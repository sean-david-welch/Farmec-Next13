import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/utils';

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

        const supplier = await prisma.supplier.create({
            data: {
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
            },
        });

        return NextResponse.json(supplier);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
