import Header from 'src/app/(main)/layout/Header';
import Footer from 'src/app/(main)/layout/Footer'
import React from "react";

export default function MainLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
}
