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

        const folder = 'SIP';
        const logoPublicId = data.logo_image.split('.').slice(0, -1).join('.');
        const marketingPublicId = data.marketing_image
            .split('.')
            .slice(0, -1)
            .join('.');

        const timestamp = Math.round(new Date().getTime() / 1000);

        if (!cloudinaryConfig.api_secret) {
            throw new Error('Missing credentials for cloudinary');
        }

        const logoSignature = cloudinary.utils.api_sign_request(
            {
                public_id: logoPublicId,
                folder: folder,
                timestamp: timestamp,
            },
            cloudinaryConfig.api_secret
        );

        const marketingSignature = cloudinary.utils.api_sign_request(
            {
                public_id: marketingPublicId,
                folder: folder,
                timestamp: timestamp,
            },
            cloudinaryConfig.api_secret
        );

        const logoUrl = cloudinary.url(`${folder}/${logoPublicId}`);
        const marketingUrl = cloudinary.url(`${folder}/${marketingPublicId}`);

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
            marketingSignature,
            timestamp,
        });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
