import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl, deleteFromCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Spareparts';

        const { name, pdf_link, spare_parts_link, parts_image } = data;

        const existingImage = await prisma.spareParts.findUnique({
            where: {
                id: id,
            },
            select: {
                parts_image: true,
            },
        });

        let sparepartUrl: string | undefined = undefined;
        let sparepartSignature, sparepartTimestamp;
        if (parts_image) {
            const { url, signature, timestamp } = await getCloudinaryUrl(
                parts_image,
                folder
            );

            sparepartUrl = url;
            sparepartSignature = signature;
            sparepartTimestamp = timestamp;
        }

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
                parts_image: sparepartUrl
                    ? sparepartUrl
                    : existingImage?.parts_image,
                pdf_link: pdf_link,
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

        await prisma.spareParts.delete({
            where: {
                id: id,
            },
        });

        if (parts_image) {
            await deleteFromCloudinary(parts_image);
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
