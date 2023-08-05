import '~/styles/globals.css';
import axios from 'axios';
import { Dosis } from 'next/font/google';

import Header from '~/components/server/Header';
import Footer from '~/components/server/Footer';
import AuthProvider from './AuthProvider';

const dosis = Dosis({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
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
                </body>
            </html>
        </AuthProvider>
    );
};

export default RootLayout;
