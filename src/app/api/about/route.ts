import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export const GET = async () => {
    const employees = prisma.employee.findMany();
    const timeline = prisma.timeline.findMany();
    const terms = prisma.terms.findMany();
    const privacy = prisma.privacy.findMany();

    const data = {
        employees,
        timeline,
        terms,
        privacy,
    };

    return NextResponse.json(data);
};
