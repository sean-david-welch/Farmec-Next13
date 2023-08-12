import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl, deleteFromCloudinary } from '~/lib/cloudinary';

export const PUT = async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Machines';

        const { name, machine_image, description, machine_link } = data;

        const existingImage = await prisma.machine.findUnique({
            where: {
                id: id,
            },
            select: {
                machine_image: true,
            },
        });

        let machineUrl: string | undefined = undefined;
        let machineSignature, machineTimestamp;

        if (machine_image) {
            const { url, signature, timestamp } = await getCloudinaryUrl(
                machine_image,
                folder
            );

            machineUrl = url;
            machineSignature = signature;
            machineTimestamp = timestamp;
        }

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: data.supplier,
            },
        });

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const machine = await prisma.machine.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                supplierId: supplier.id,
                machine_image: machineUrl
                    ? machineUrl
                    : existingImage?.machine_image,
                description: description,
                machine_link: machine_link,
            },
        });

        return NextResponse.json({
            machine,
            machineSignature,
            machineTimestamp,
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

        const machine = await prisma.machine.findUnique({
            where: {
                id: id,
            },
        });

        if (!machine) {
            throw new Error('Machine not found');
        }

        const { machine_image } = machine;

        await prisma.machine.delete({
            where: {
                id: id,
            },
        });

        if (machine_image) {
            await deleteFromCloudinary(machine_image);
        } else {
            throw new Error('Machine image not found');
        }

        return NextResponse.json({ message: 'Machine deleted' });
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
