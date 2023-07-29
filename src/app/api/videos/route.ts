import { prisma } from '~/lib/prisma';

import { NextResponse, NextRequest } from 'next/server';
import { validateUser, errorResponse } from '~/utils/user';
import { google } from 'googleapis';

interface YoutubeVideo {
    id: string;
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
}

interface YoutubeApiResponse {
    data: {
        items: YoutubeVideo[];
    };
}

export const POST = async (request: NextRequest) => {
    try {
        await validateUser();

        const data = await request.json();

        const { web_url } = data;

        const videoId = web_url.split('v=')[1].split('&')[0];

        const youtube = google.youtube({
            version: 'v3',
            auth: process.env.YOUTUBE_API_KEY,
        });

        const videoResponse = (await youtube.videos.list({
            part: ['id', 'snippet'],
            id: videoId,
            maxResults: 1,
        })) as YoutubeApiResponse;

        if (
            !videoResponse.data.items ||
            videoResponse.data.items.length === 0
        ) {
            throw new Error('Video not found on YouTube');
        }

        const { title, thumbnails, description } =
            videoResponse.data.items[0].snippet;

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: data.supplier,
            },
        });

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const video = await prisma.video.create({
            data: {
                supplierId: supplier.id,
                web_url,
                title,
                description,
                video_id: videoId,
                thumbnail_url: thumbnails.medium.url,
            },
        });

        return NextResponse.json(video);
    } catch (error: any) {
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
