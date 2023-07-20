import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

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
        } = await uploadToCloudinary(image, folder);

        const carousel = await prisma.carousel.update({
            where: {
                id: id,
            },
            data: {
                name: name,
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

export const DELETE = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();

        const carousel = await prisma.carousel.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ carousel });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || '');
    }
};
