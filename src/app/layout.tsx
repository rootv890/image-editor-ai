import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from '@/auth';
import Modals from "@/components/modals";
import SubscriptionAlert from "@/features/subscriptions/components/SubscriptionAlert";
const inter = Inter( { subsets: [ "latin" ] } );

export const metadata: Metadata = {
    title: "Canva Clone",
    description: "Simple alternative to Canva",
};

export default async function RootLayout ( {
    children,
}: Readonly<{
    children: React.ReactNode;
}> )
{
    const session = await auth();
    return (
        <SessionProvider>
            <html lang="en">
                <Providers>
                    <Toaster />
                    <Modals />
                    <SubscriptionAlert />
                    <body className={inter.className}>{children}</body>
                </Providers>
            </html>
        </SessionProvider>
    );
}
