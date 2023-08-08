import axios from 'axios';

import { emailUser } from '~/lib/config';
import { transporter } from '~/lib/mail';
import { errorResponse } from '~/utils/user';
import { NextRequest, NextResponse } from 'next/server';

const recaptcha = process.env.RECAPTCHA_SECRET;

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const data = await request.json();

        const { name, email, message, recaptchaResponse } = data;

        const googleResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                secret: recaptcha,
                response: recaptchaResponse,
            }
        );

        if (googleResponse.data.success) {
            const response = await transporter.sendMail({
                from: emailUser,
                to: emailUser,
                subject: `New message from ${name} -  ${email}`,
                text: message,
            });

            return NextResponse.json(response);
        } else {
            return errorResponse(400, 'Invalid Captcha');
        }
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
