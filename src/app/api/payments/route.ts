import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary } from '~/lib/cloudinary';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
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
        } = await uploadToCloudinary(image, folder);

        const payment = await prisma.paymentProduct.create({
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
