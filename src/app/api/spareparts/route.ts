import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';

export const GET = async () => {
    const spareparts = await prisma.spareParts.findMany({});

    return NextResponse.json(spareparts);
};

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Spareparts';

        const { name, pdf_link, spare_parts_link, parts_image } = data;

        if (!parts_image) {
            throw new Error('Parts image not found');
        }

        let pdfUrl = null,
            pdfSignature = null,
            pdfTimestamp = null;
        if (pdf_link !== null && pdf_link !== undefined && pdf_link !== '') {
            const pdfResponse = await getCloudinaryUrl(pdf_link, folder);
            pdfUrl = pdfResponse.url;
            pdfSignature = pdfResponse.signature;
            pdfTimestamp = pdfResponse.timestamp;
        }

        const {
            url: sparepartUrl,
            signature: sparepartSignature,
            timestamp: sparepartTimestamp,
        } = await getCloudinaryUrl(parts_image, folder);

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: data.supplier,
            },
        });

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const sparepart = await prisma.spareParts.create({
            data: {
                name: name,
                supplierId: supplier.id,
                parts_image: sparepartUrl,
                pdf_link: pdfUrl,
                spare_parts_link: spare_parts_link,
            },
        });

        return NextResponse.json({
            sparepart,
            sparepartSignature,
            sparepartTimestamp,
            pdfSignature,
            pdfTimestamp,
            folder,
        });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
