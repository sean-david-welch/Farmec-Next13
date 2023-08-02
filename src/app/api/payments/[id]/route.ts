import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Payments';

        const { name, price, image } = data;

        if (!image) {
            throw new Error('Image not found');
        }

        const {
            url: imageUrl,
            signature: imageSignature,
            timestamp: imageTimestamp,
        } = await getCloudinaryUrl(image, folder);

        const payment = await prisma.paymentProduct.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                price: price,
                image: imageUrl,
            },
        });

        return NextResponse.json({
            payment,
            imageSignature,
            imageTimestamp,
            folder,
        });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();

        const payment = await prisma.paymentProduct.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({
            payment,
        });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
