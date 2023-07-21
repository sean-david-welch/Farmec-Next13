let baseUrl: string,
    stripePublic: string,
    stripeSecret: string,
    webhookSecret: string,
    nextAuthUrl: string;

if (process.env.NODE_ENV !== 'production') {
    baseUrl = process.env.BASE_URL || '';
    stripePublic = process.env.STRIPE_PUBLIC_KEY || '';
    stripeSecret = process.env.STRIPE_SECRET_KEY || '';
    webhookSecret = process.env.WEBHOOK_SECRET || '';
    nextAuthUrl = process.env.NEXTAUTH_URL || '';
}
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000';
    stripePublic = process.env.TEST_PUBLIC_KEY || '';
    stripeSecret = process.env.TEST_SECRET_KEY || '';
    nextAuthUrl = 'http://localhost:3000';
}

export { baseUrl, stripePublic, stripeSecret, webhookSecret };
