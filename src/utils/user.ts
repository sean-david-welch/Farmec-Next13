import { prisma } from '~/lib/prisma';
import { authOptions } from '~/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export const errorResponse = (status: number, messgae: string) => {
    return NextResponse.json({
        status,
        messgae,
    });
};

export const validateUser = async () => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error(`Not Logged In!`);

    const currentUserEmail = session?.user?.email;

    if (!currentUserEmail)
        throw new Error('No Email associated with this account');

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    if (!user) throw new Error('User not found');

    if (user?.role !== 'ADMIN')
        throw new Error('User does not have admin privileges');

    return user;
};

export const getSessionAndUser = async () => {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;

    if (!currentUserEmail) {
        return { session: null, user: null };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    return { session, user, currentUserEmail };
};
