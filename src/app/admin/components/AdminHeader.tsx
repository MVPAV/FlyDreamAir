'use client';

import Link from 'next/link';

export default function AdminHeader() {
    return (
        <header className="bg-blue-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
            <Link
                href="/"
                className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
                Back to Site
            </Link>
        </header>
    );
}
