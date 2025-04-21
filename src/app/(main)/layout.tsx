import Header from 'src/app/(main)/layout/Header';
import Footer from 'src/app/(main)/layout/Footer'

export default function MainLayout({children}) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
}
