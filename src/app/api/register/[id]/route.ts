import bcrypt from 'bcrypt';

import { prisma } from '~/lib/prisma';
import { validateUser, errorResponse } from '~/utils/user';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];

    try {
        await validateUser();
        const { username, password, role } = await request.json();

        if (!username || !password) {
            return errorResponse(400, 'Missing username or password');
        }

        const existingUser = await prisma.user.findUnique({
            where: { username: username },
        });

        if (existingUser) {
            return errorResponse(400, 'Username already exists');
        }

        const validRoles = ['USER', 'ADMIN', 'STAFF'];

        if (role && !validRoles.includes(role)) {
            return errorResponse(400, 'Invalid role');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: username,
                name: username,
                passwordHash: hashPassword,
                role: role || 'USER',
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    const id = request.nextUrl.pathname.split('/')[3];
    try {
        await validateUser();

        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
