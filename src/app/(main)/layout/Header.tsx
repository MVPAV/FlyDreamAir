"use client";
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import {usePathname} from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <img src="/logo.png" alt="FlyDreamAir Logo" className="h-12 w-auto" />
                </Link>
            </div>

            <div className="flex-1 flex justify-center">
                {/* Navigation Links */}
                <ul className="hidden md:flex items-center space-x-6 font-medium pl-34">
                    <li>
                        <Link
                            href="/home"
                            className={pathname === "/home"
                                ? "border-b-2 border-blue-700 pb-1 text-blue-900 font-semibold"
                                : "text-gray-500 hover:text-blue-900"}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/manage-booking"
                            className={pathname === "/manage-booking"
                                ? "border-b-2 border-blue-700 pb-1 text-blue-900 font-semibold"
                                : "text-gray-500 hover:text-blue-900"}
                        >
                            Manage Booking
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/our-services"
                            className={pathname === "/our-services"
                                ? "border-b-2 border-blue-700 pb-1 text-blue-900 font-semibold"
                                : "text-gray-500 hover:text-blue-900"}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#"
                            className={pathname === "/#"
                                ? "border-b-2 border-blue-700 pb-1 text-blue-900 font-semibold"
                                : "text-gray-500 hover:text-blue-900"}
                        >
                            About Us
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                    <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium">Login</button>
                </Link>
                <Link href="/auth/signup">
                <button className="border border-blue-900 text-blue-900 px-6 py-2 rounded-lg font-medium">Sign up</button>
                </Link>
                <FaUserCircle className="text-3xl text-gray-700" />
            </div>
        </nav>
    );
}
