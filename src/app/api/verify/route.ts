import axios from 'axios';

import { cloudflarePrivate } from '~/lib/config';
import { NextRequest, NextResponse } from 'next/server';
import { errorResponse } from '~/utils/user';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const endpoint =
        'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const secret = cloudflarePrivate;

    try {
        const data = await request.json();

        const { token } = data;

        const response = await axios.post(endpoint, {
            secret,
            token,
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
