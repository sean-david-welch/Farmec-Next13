import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export const GET = async () => {
    const projects = await prisma.supplier.findMany();

    return NextResponse.json(projects);
};

export const POST = async () => {};
