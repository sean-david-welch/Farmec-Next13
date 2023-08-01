let baseUrl: string,
    stripePublic: string,
    stripeSecret: string,
    webhookSecret: string;

const emailHost = process.env.EMAIL_HOST || '';
const emailPass = process.env.EMAIL_HOST_PASSWORD || '';
const emailUser = process.env.EMAIL_HOST_USER || '';
const emailPort = process.env.EMAIL_PORT || '';

const cloudflareKey = process.env.CLOUDFLARE_SITE_KEY || '';
const cloudflarePrivate = process.env.CLOUDFLARE_SECRET || '';

if (process.env.NODE_ENV !== 'production') {
    baseUrl = process.env.BASE_URL || '';
    stripePublic = process.env.STRIPE_PUBLIC_KEY || '';
    stripeSecret = process.env.STRIPE_SECRET_KEY || '';
    webhookSecret = process.env.WEBHOOK_SECRET || '';
}
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000';
    stripePublic = process.env.TEST_PUBLIC_KEY || '';
    stripeSecret = process.env.TEST_SECRET_KEY || '';
}

export { baseUrl, stripePublic, stripeSecret, webhookSecret };
export { emailHost, emailPass, emailUser, emailPort };
export { cloudflareKey, cloudflarePrivate };
