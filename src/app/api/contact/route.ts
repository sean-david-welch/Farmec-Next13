import { emailUser } from '~/lib/config';
import { transporter } from '~/lib/mail';
import { errorResponse } from '~/utils/user';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const data = await request.json();

        const { name, email, message } = data;

        const response = await transporter.sendMail({
            from: emailUser,
            to: emailUser,
            subject: `New message from ${name} -  ${email}`,
            text: message,
        });

        return NextResponse.json(response);
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
