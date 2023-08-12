import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';
import { url } from 'inspector';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();

        const data = await request.json();

        const existingImage = await prisma.carousel.findUnique({
            where: { id: id },
            select: { image: true },
        });

        const folder = 'Carousel';

        const { name, image } = data;

        let imageUrl: string | undefined = undefined;
        let imageSignature, imageTimestamp;

        if (image) {
            const { url, signature, timestamp } = await getCloudinaryUrl(
                image,
                folder
            );

            imageUrl = url;
            imageSignature = signature;
            imageTimestamp = timestamp;
        }

        const carousel = await prisma.carousel.update({
            where: {
                id: id,
            },
            data: {
                name: `Carousel/${name}`,
                image: imageUrl ? imageUrl : existingImage?.image,
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
