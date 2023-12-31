import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { getCloudinaryUrl } from '~/lib/cloudinary';

export const GET = async () => {
    const machines = await prisma.machine.findMany({});

    return NextResponse.json(machines);
};

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Machines';

        const { name, machine_image, description, machine_link } = data;

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

        const machine = await prisma.machine.create({
            data: {
                name: name,
                supplierId: supplier.id,
                machine_image: machineUrl,
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
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
