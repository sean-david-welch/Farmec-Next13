import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary, deleteFromCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Spareparts';

        const { name, description, spare_parts_link, parts_image } = data;

        if (!parts_image) {
            throw new Error('Parts image not found');
        }

        const {
            url: sparepartUrl,
            signature: sparepartSignature,
            timestamp: sparepartTimestamp,
        } = await uploadToCloudinary(parts_image, folder);

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: data.supplier,
            },
        });

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const sparepart = await prisma.spareParts.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                supplierId: supplier.id,
                parts_image: sparepartUrl,
                description: description,
                spare_parts_link: spare_parts_link,
            },
        });

        return NextResponse.json({
            sparepart,
            sparepartSignature,
            sparepartTimestamp,
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

        const sparepart = await prisma.spareParts.findUnique({
            where: {
                id: id,
            },
        });

        if (!sparepart) {
            throw new Error('Sparepart not found');
        }

        const { parts_image } = sparepart;
        const partsId = parts_image?.split('/').pop()?.split('.')[0] ?? '';

        await prisma.spareParts.delete({
            where: {
                id: id,
            },
        });

        if (partsId) {
            await deleteFromCloudinary(partsId);
        } else {
            throw new Error('Parts image not found');
        }

        return NextResponse.json({
            message: 'Sparepart deleted successfully',
        });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};