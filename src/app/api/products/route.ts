import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary } from '~/lib/cloudinary';

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Products';

        const { name, product_image, product_link, description } = data;

        if (!product_image) {
            throw new Error('Product image not found');
        }

        const {
            url: productUrl,
            signature: productSignature,
            timestamp: productTimestamp,
        } = await uploadToCloudinary(data.product_image, folder);

        const machine = await prisma.machine.findUnique({
            where: {
                id: data.machine,
            },
        });

        if (!machine) {
            throw new Error('Machine not found');
        }

        const product = await prisma.product.create({
            data: {
                name: name,
                machineId: machine.id,
                product_image: productUrl,
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
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
