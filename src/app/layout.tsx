import {TRPCProvider} from 'src/utils/trpcProvider';
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import ClientHydrationProvider from "src/app/components/ClientHydrationProvider";
import {LayoutSessionProvider} from "src/app/components/LayoutSessionProvider";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "FlyDreamAir",
    description: "Reach your dream destination",
};

export default function RootLayout({children}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={inter.className}
        >
        <TRPCProvider>
            <NuqsAdapter>
                <LayoutSessionProvider>
                    <ClientHydrationProvider/>
                    {children}
                </LayoutSessionProvider>
            </NuqsAdapter>
        </TRPCProvider>
        </body>
        </html>
    );
}
