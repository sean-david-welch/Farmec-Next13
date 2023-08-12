import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const data = await request.json();

        console.log(data);

        const folder = 'Payments';

        const { name, price, image } = data;

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

        const paymentProduct = await prisma.paymentProduct.create({
            data: {
                name: name,
                price: Number(price),
                image: imageUrl,
            },
        });

        if (!paymentProduct) {
            throw new Error('Payment product not found');
        }

        return NextResponse.json({
            paymentProduct,
            imageSignature,
            imageTimestamp,
            folder,
        });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
