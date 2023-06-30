import '~/styles/globals.css';
import { Inter } from 'next/font/google';

import Header from '~/components/server/Header';

const inter = Inter({ subsets: ['latin'] });

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
        <html lang="en" className={inter.className}>
            <body className="min-h-screen">
                <Header />
                <main>
                    <div className="container">{children}</div>
                </main>
            </body>
        </html>
    );
}
