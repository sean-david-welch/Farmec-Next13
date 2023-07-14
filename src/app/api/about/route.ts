import { prisma } from '~/lib/prisma';
import { uploadToCloudinary } from '~/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';

export const GET = async () => {
    const employee = prisma.employee.findMany();
    const timeline = prisma.timeline.findMany();
    const terms = prisma.terms.findMany();
    const privacy = prisma.privacy.findMany();

    const data = {
        employee,
        timeline,
        terms,
        privacy,
    };

    return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();
        const { model, data } = await request.json();

        let result;
        let profileSignature, profileTimestamp;
        switch (model) {
            case 'employee':
                const folder = 'Employees';

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

                result = await prisma.employee.create({
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        role: data.role,
                        bio: data.bio,
                        profile_image: profileUrl,
                    },
                });
                break;
            case 'timeline':
                result = await prisma.timeline.create({
                    data: {
                        title: data.title,
                        date: data.date,
                        body: data.body,
                    },
                });
                break;
            case 'terms':
                result = await prisma.terms.create({
                    data: {
                        title: data.title,
                        body: data.body,
                    },
                });
                break;
            case 'privacy':
                result = await prisma.privacy.create({
                    data: {
                        title: data.title,
                        body: data.body,
                    },
                });
                break;
            default:
                return NextResponse.json({ error: 'Invalid model' });
        }

        if (profileSignature && profileTimestamp) {
            return NextResponse.json({
                result,
                profileSignature,
                profileTimestamp,
                folder: 'Employees',
            });
        } else {
            return NextResponse.json(result);
        }
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
