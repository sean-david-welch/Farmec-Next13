import { prisma } from '~/lib/prisma';
import { getCloudinaryUrl } from '~/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';

interface Data {
    title?: string;
    date?: string;
    main_image?: string;
    subheading?: string;
    body?: string;
    location?: string;
    info?: string;
    id?: string;
}

type ModelType = 'blog' | 'exhibition';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await validateUser();
        const { model, data }: { model: ModelType; data: Data } =
            await request.json();

        if (!model || !data) {
            return NextResponse.json({ error: 'Invalid request' });
        }

        let result, folder, blogSignature, blogTimestamp, blogUrl: string;

        const createFunctions = {
            blog: (data: Data) =>
                prisma.blog.update({
                    where: {
                        id: data.id,
                    },
                    data: {
                        title: data.title,
                        date: data.date,
                        main_image: blogUrl,
                        subheading: data.subheading,
                        body: data.body,
                    },
                }),
            exhibition: (data: Data) =>
                prisma.exhibition.update({
                    where: {
                        id: data.id,
                    },
                    data: {
                        title: data.title,
                        date: data.date,
                        location: data.location,
                        info: data.info,
                    },
                }),
        };

        if (model === 'blog') {
            folder = 'Blog';

            const { main_image } = data;

            if (!main_image) {
                throw new Error('Main image not found');
            }

            const { url, signature, timestamp } = await getCloudinaryUrl(
                main_image,
                folder
            );

            blogUrl = url;
            blogSignature = signature;
            blogTimestamp = timestamp;

            result = await createFunctions[
                model as keyof typeof createFunctions
            ](data);
        } else if (model === 'exhibition') {
            result = await createFunctions[
                model as keyof typeof createFunctions
            ](data);
        } else {
            return NextResponse.json({ error: 'Invalid model' });
        }

        if (blogSignature && blogTimestamp) {
            return NextResponse.json({
                result,
                blogSignature,
                blogTimestamp,
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

        const { model, id }: { model: ModelType; id: string } =
            await request.json();

        const deleteFunctions = {
            blog: (id: string) => prisma.blog.delete({ where: { id } }),
            exhibition: (id: string) =>
                prisma.exhibition.delete({ where: { id } }),
        };

        if (!model || !id) {
            return NextResponse.json({ error: 'Invalid request' });
        }

        const result = await deleteFunctions[
            model as keyof typeof deleteFunctions
        ](id);

        return NextResponse.json(result);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
