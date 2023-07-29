import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const data = await request.json();

        const { warrantyClaim, partsRequired } = data;

        const {
            dealer,
            dealer_contact,
            owner_name,
            machine_model,
            serial_number,
            install_date,
            failure_date,
            repair_date,
            failure_details,
            repair_details,
            labour_hours,
            completed_by,
        } = warrantyClaim;

        const warranty = await prisma.warrantyClaim.update({
            where: {
                id: id,
            },
            data: {
                dealer: dealer,
                dealer_contact: dealer_contact,
                owner_name: owner_name,
                machine_model: machine_model,
                serial_number: serial_number,
                install_date: install_date,
                failure_date: failure_date,
                repair_date: repair_date,
                failure_details: failure_details,
                repair_details: repair_details,
                labour_hours: labour_hours,
                completed_by: completed_by,
                parts: {
                    create: partsRequired.map(
                        (part: {
                            part_number: string;
                            quantity_needed: string;
                            invoice_number: string;
                            description: string;
                        }) => ({
                            part_number: part.part_number,
                            quantity_needed: part.quantity_needed,
                            invoice_number: part.invoice_number,
                            description: part.description,
                        })
                    ),
                },
            },
        });

        if (!warranty) {
            throw new Error('Warranty Claim not found');
        }

        return NextResponse.json({ warranty });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];
    try {
        await validateUser();

        const machineReg = await prisma.machineRegistration.delete({
            where: {
                id: id,
            },
        });

        if (!machineReg) {
            throw new Error('Machine Registration not found');
        }

        return NextResponse.json({ machineReg });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
