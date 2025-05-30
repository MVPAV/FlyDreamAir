"use client";
import {useState} from "react";
import {FaUserCircle, FaBars, FaTimes} from "react-icons/fa";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useSession, signOut} from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const {data: session} = useSession();
    const router = useRouter()

    const navLinks = [
        {name: "Home", href: "/home"},
        {name: "Manage Booking", href: "/manage-booking"},
        {name: "Services", href: "/our-services"},
    ];

    return (
        <nav
            className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm px-6 md:px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <img src="/logo.png" alt="FlyDreamAir Logo" className="h-12 w-auto"/>
                </Link>
            </div>

            {/* Hamburger Icon (Mobile) */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl text-gray-700"
                >
                    {menuOpen ? <FaTimes/> : <FaBars/>}
                </button>
            </div>

            {/* Navigation Links (Desktop - Centered) */}
            <ul className="hidden md:flex items-center space-x-6 font-medium absolute left-1/2 transform -translate-x-1/2">
                {navLinks.map(({name, href}) => (
                    <li key={name}>
                        <Link
                            href={href}
                            className={
                                pathname === href
                                    ? "border-b-2 border-blue-700 pb-1 text-blue-900 font-semibold"
                                    : "text-gray-500 hover:text-blue-900"
                            }
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>


            {/* Right Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
                {session ? (
                    <>
                        <button
                            onClick={() => router.push('/profile')}
                            className="text-gray-600 cursor-pointer"
                            title="Profile"
                        >
                            <FaUserCircle className="text-3xl"/>
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/auth/signin">
                            <button
                                className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">Sign
                                in
                            </button>
                        </Link>
                        <Link href="/auth/signup">
                            <button
                                className="border border-blue-900 text-blue-900 px-6 py-2 rounded-lg font-medium cursor-pointer">Sign
                                up
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-4 space-y-4">
                    {navLinks.map(({name, href}) => (
                        <Link
                            key={name}
                            href={href}
                            className={`w-full text-center py-2 font-medium ${
                                pathname === href ? "text-blue-900 font-semibold" : "text-gray-600"
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {name}
                        </Link>
                    ))}
                    {session ? (
                        <button
                            onClick={() => router.push('/profile')}
                            className="text-gray-600 hover:text-red-600 flex items-center space-x-2"
                        >
                            <FaUserCircle className="text-2xl"/>
                            <span>Sign out</span>
                        </button>
                    ) : (
                        <>
                            <Link href="/auth/signin">
                                <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium w-40">Sign
                                    in
                                </button>
                            </Link>
                            <Link href="/auth/signup">
                                <button
                                    className="border border-blue-900 text-blue-900 px-6 py-2 rounded-lg font-medium w-40">Sign
                                    up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
