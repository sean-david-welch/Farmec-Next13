import { prisma } from '~/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const { model, id, data } = await request.json();

        let result;
        switch (model) {
            case 'employee':
                result = await prisma.employee.update({
                    where: { id },
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        role: data.role,
                        bio: data.bio,
                        profile_image: data.profile_image,
                    },
                });
                break;
            case 'timeline':
                result = await prisma.timeline.update({
                    where: { id },
                    data: {
                        title: data.title,
                        date: data.date,
                        body: data.body,
                    },
                });
                break;
            case 'terms':
                result = await prisma.terms.update({
                    where: { id },
                    data: {
                        title: data.title,
                        body: data.body,
                    },
                });
                break;
            case 'privacy':
                result = await prisma.privacy.update({
                    where: { id },
                    data: {
                        title: data.title,
                        body: data.body,
                    },
                });
                break;
            default:
                return NextResponse.json({ error: 'Invalid model' });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const { model, id } = await request.json();

        let result;
        switch (model) {
            case 'employee':
                result = await prisma.employee.delete({
                    where: { id },
                });
                break;
            case 'timeline':
                result = await prisma.timeline.delete({
                    where: { id },
                });
                break;
            case 'terms':
                result = await prisma.terms.delete({
                    where: { id },
                });
                break;
            case 'privacy':
                result = await prisma.privacy.delete({
                    where: { id },
                });
                break;
            default:
                return NextResponse.json({ error: 'Invalid model' });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
