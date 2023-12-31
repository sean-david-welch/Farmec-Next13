import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl, deleteFromCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Products';

        const { name, product_image, description, product_link } = data;

        const existingImage = await prisma.product.findUnique({
            where: {
                id: id,
            },
            select: {
                product_image: true,
            },
        });

        let productUrl: string | undefined = undefined;
        let productSignature, productTimestamp;
        if (product_image) {
            const { url, signature, timestamp } = await getCloudinaryUrl(
                product_image,
                folder
            );

            productUrl = url;
            productSignature = signature;
            productTimestamp = timestamp;
        }

        const machine = await prisma.machine.findUnique({
            where: {
                id: data.machine,
            },
        });

        if (!machine) {
            throw new Error('Machine not found');
        }

        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                machineId: machine.id,
                product_image: productUrl
                    ? productUrl
                    : existingImage?.product_image,
                description: description,
                product_link: product_link,
            },
        });

        return NextResponse.json({
            product,
            productSignature,
            productTimestamp,
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

        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
        });

        if (!product) {
            throw new Error('Product not found');
        }

        const { product_image } = product;

        await prisma.product.delete({
            where: {
                id: id,
            },
        });

        if (product_image) {
            await deleteFromCloudinary(product_image);
        } else {
            throw new Error('Product image not found');
        }

        return NextResponse.json({
            message: 'Product deleted successfully',
        });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
