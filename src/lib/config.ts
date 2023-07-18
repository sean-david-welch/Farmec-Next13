let baseUrl: string,
    stripePublic: string,
    stripeSecret: string,
    webhookSecret: string;

if (process.env.NODE_ENV !== 'production') {
    baseUrl = process.env.BASE_URL || '';
    stripePublic = process.env.STRIPE_PUBLIC_KEY || '';
    stripeSecret = process.env.STRIPE_SECRET_KEY || '';
    webhookSecret = process.env.WEBHOOK_SECRET || '';
}
if (process.env.NODE_ENV === 'development') {
    stripePublic = process.env.TEST_PUBLIC_KEY || '';
    stripeSecret = process.env.TEST_SECRET_KEY || '';
}

export { baseUrl, stripePublic, stripeSecret, webhookSecret };
