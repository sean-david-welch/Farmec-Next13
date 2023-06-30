import '~/styles/globals.css';
import { Dosis } from 'next/font/google';

import Header from '~/components/server/Header';
import Footer from '~/components/server/Footer';

const dosis = Dosis({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
});

export const metadata = {
    title: 'Farmec Ireland Ltd',
    description: 'Importers & Distributors of Quality Farm Machinery',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={dosis.className}>
            <body className="min-h-screen">
                <Header />
                <main>
                    <div className="container">{children}</div>
                </main>
                <Footer />
            </body>
        </html>
    );
}
