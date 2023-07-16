import { prisma } from '~/lib/prisma';
import { uploadToCloudinary } from '~/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';

interface Data {
    title?: string;
    body?: string;
    date?: string;
    profile_image?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    bio?: string;
    id?: string;
}

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const { model, id, data } = await request.json();

        if (!model || !data) {
            return NextResponse.json({ error: 'Invalid request' });
        }

        const updateFunctions = {
            timeline: (data: Data) =>
                prisma.timeline.update({
                    where: { id },
                    data: {
                        title: data.title,
                        date: data.date,
                        body: data.body,
                    },
                }),
            terms: (data: Data) =>
                prisma.terms.update({
                    where: { id },
                    data: { title: data.title, body: data.body },
                }),
            privacy: (data: Data) =>
                prisma.privacy.update({
                    where: { id },
                    data: { title: data.title, body: data.body },
                }),
        };

        let result;
        let profileSignature, profileTimestamp, folder;

        if (model === 'employee') {
            folder = 'Employees';

            const { profile_image } = data;

            if (!profile_image) {
                throw new Error('Profile image not found');
            }

            const {
                url: profileUrl,
                signature,
                timestamp,
            } = await uploadToCloudinary(data.profile_image, folder);

            profileSignature = signature;
            profileTimestamp = timestamp;

            result = await prisma.employee.update({
                where: { id },
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    bio: data.bio,
                    profile_image: profileUrl,
                },
            });
        } else if (Object.keys(updateFunctions).includes(model)) {
            result = await updateFunctions[
                model as keyof typeof updateFunctions
            ](data);
        } else {
            return NextResponse.json({ error: 'Invalid model' });
        }

        if (profileSignature && profileTimestamp) {
            return NextResponse.json({
                result,
                profileSignature,
                profileTimestamp,
                folder,
            });
        } else {
            return NextResponse.json(result);
        }
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const { model, id } = await request.json();

        const deleteFunctions = {
            employee: () => prisma.employee.delete({ where: { id } }),
            timeline: () => prisma.timeline.delete({ where: { id } }),
            terms: () => prisma.terms.delete({ where: { id } }),
            privacy: () => prisma.privacy.delete({ where: { id } }),
        };

        if (Object.keys(deleteFunctions).includes(model)) {
            const result = await deleteFunctions[
                model as keyof typeof deleteFunctions
            ]();
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: 'Invalid model' });
        }
    } catch (error: any) {
        console.log(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
