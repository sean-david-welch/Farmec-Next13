import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';

export const GET = async () => {
    try {
        const carousel = await prisma.carousel.findMany();

        return NextResponse.json(carousel);
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Carousel';

        const { name, image } = data;

        if (!image) {
            throw new Error('image not found');
        }

        const {
            url: imageUrl,
            signature: imageSignature,
            timestamp: imageTimestamp,
        } = await getCloudinaryUrl(image, folder);

        const carousel = await prisma.carousel.create({
            data: {
                name: `Carousel/${name}`,
                image: imageUrl,
            },
        });

        return NextResponse.json({
            carousel,
            imageSignature,
            imageTimestamp,
            folder,
        });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
