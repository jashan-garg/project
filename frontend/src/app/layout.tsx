import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
    title: 'Doctor Appointment Booking',
    description:
        'Book appointments with qualified doctors easily and securely.',
    keywords: [
        'doctor booking',
        'medical appointments',
        'healthcare system',
        'clinic',
        'doctor appointment app',
    ],
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} 
                    antialiased 
                    bg-gray-50 dark:bg-gray-900 
                    text-gray-900 dark:text-gray-100 
                    transition-colors duration-300`}
            >
                {/* Global Providers */}
                <Providers>{children}</Providers>

                {/* Smooth Scroll */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{document.documentElement.style.scrollBehavior='smooth'}catch(e){}`,
                    }}
                />

                {/* Custom Scrollbar (Optional but Premium) */}
                <style>{`
                    *::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    *::-webkit-scrollbar-thumb {
                        background: rgba(100,100,100,0.4);
                        border-radius: 4px;
                    }
                    *::-webkit-scrollbar-thumb:hover {
                        background: rgba(120,120,120,0.6);
                    }
                `}</style>
            </body>
        </html>
    );
}
