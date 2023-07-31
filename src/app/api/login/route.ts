import bcrypt from 'bcrypt';

import { prisma } from '~/lib/prisma';
import { errorResponse } from '~/utils/user';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return errorResponse(400, 'Missing username or password');
        }

        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            return errorResponse(401, 'Invalid username or password');
        }

        if (!user.passwordHash) {
            return errorResponse(401, 'Invalid username or password');
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isValidPassword) {
            return errorResponse(401, 'Invalid username or password');
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
