import '~/styles/globals.css';

import { Dosis } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Analytics } from '@vercel/analytics/react';

import axios from 'axios';
import Header from '~/components/server/Header';
import Footer from '~/components/server/Footer';
import AuthProvider from './AuthProvider';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const dosis = Dosis({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    preload: true,
});

export const metadata = {
    title: 'Farmec Ireland Ltd',
    description: 'Importers & Distributors of Quality Farm Machinery',
    viewport: { width: 'device-width', initialScale: 1 },
};

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://farmec-next13.vercel.app';
} else {
    axios.defaults.baseURL = 'http://localhost:3000';
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <html lang="en" className={dosis.className}>
                <body className="min-h-screen overflow-x-hidden mx-auto max-w-full">
                    <Header />
                    <main className="max-w-full overflow-x-hidden mx-auto">
                        {children}
                    </main>
                    <Footer />
                    <Analytics />
                </body>
            </html>
        </AuthProvider>
    );
};

export default RootLayout;
