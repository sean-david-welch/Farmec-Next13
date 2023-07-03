import '~/styles/globals.css';
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
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <html lang="en" className={dosis.className}>
                <body className="min-h-screen w-[100vw] overflow-x-hidden">
                    <Header />
                    <main>
                        <div className="container">{children}</div>
                    </main>
                    <Footer />
                </body>
            </html>
        </AuthProvider>
    );
};

export default RootLayout;
