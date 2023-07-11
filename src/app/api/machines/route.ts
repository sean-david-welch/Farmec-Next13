import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { uploadToCloudinary } from '~/lib/cloudinary';

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();
        const data = await request.json();

        const folder = 'Machines';

        const {
            url: machineUrl,
            signature: machineSignature,
            timestamp: machineTimestamp,
        } = await uploadToCloudinary(data.logo_image, folder);

        const machine = await prisma.machine.create({
            data: {
                name: data.name,
                supplierId: data.supplierId,
                machine_image: machineUrl,
                description: data.description,
                machine_link: data.machine_link,
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
