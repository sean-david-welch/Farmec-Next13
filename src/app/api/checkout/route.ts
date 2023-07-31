import Stripe from 'stripe';

import { prisma } from '~/lib/prisma';
import { errorResponse } from '~/utils/user';

import { baseUrl, stripeSecret, webhookSecret } from '~/lib/config';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(String(stripeSecret));

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const data = await request.json();
        const product = await prisma.paymentProduct.findUnique({
            where: {
                id: data.id,
            },
        });

        if (!product) {
            return errorResponse(404, 'Product not found');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100,
                        tax_behavior: 'inclusive',
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${baseUrl}payments/success`,
            cancel_url: `${baseUrl}payments/failure`,
            automatic_tax: { enabled: true },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error(error);
        return errorResponse(500, error.message || 'Internal Server Error');
    }
};
