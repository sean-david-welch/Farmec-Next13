import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const data = await request.json();

        const {
            dealer_name,
            dealer_address,
            owner_name,
            owner_address,
            machine_model,
            serial_number,
            install_date,
            invoice_number,
            complete_supply,
            pdi_complete,
            pto_correct,
            machine_test_run,
            safety_induction,
            operator_handbook,
            date,
            completed_by,
        } = data;

        const machineReg = await prisma.machineRegistration.create({
            data: {
                dealer_name: dealer_name,
                dealer_address: dealer_address,
                owner_name: owner_name,
                owner_address: owner_address,
                machine_model: machine_model,
                serial_number: serial_number,
                install_date: install_date,
                invoice_number: invoice_number,
                complete_supply: complete_supply,
                pdi_complete: pdi_complete,
                pto_correct: pto_correct,
                machine_test_run: machine_test_run,
                safety_induction: safety_induction,
                operator_handbook: operator_handbook,
                date: date,
                completed_by: completed_by,
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
