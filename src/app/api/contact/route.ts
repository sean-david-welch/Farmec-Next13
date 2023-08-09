import axios from 'axios';

import { emailUser } from '~/lib/config';
import { transporter } from '~/lib/mail';
import { errorResponse } from '~/utils/user';
import { NextRequest, NextResponse } from 'next/server';

const recaptcha = process.env.RECAPTCHA_SECRET!;

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const data = await request.json();

        const { name, email, message, recaptchaResponse } = data;

        const params = new URLSearchParams();
        params.append('secret', recaptcha);
        params.append('response', recaptchaResponse);

        await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const response = await transporter.sendMail({
            from: emailUser,
            cc: email,
            to: emailUser,
            subject: `New Contact Form sent from: ${name} - ${email}`,
            text: message,
        });

        return NextResponse.json(response);
    } catch (error: any) {
        console.error('Error encountered:', error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
