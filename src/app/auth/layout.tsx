import Header from "src/app/(main)/layout/Header";
import Footer from "src/app/(main)/layout/Footer";
import type {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

export default function AuthLayout({children}: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer/>
        </div>
    );
}
