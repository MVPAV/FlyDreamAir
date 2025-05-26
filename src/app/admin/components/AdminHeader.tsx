'use client';

import Link from 'next/link';

export default function AdminHeader() {
    return (
        <header className="bg-blue-900 text-white py-4 px-6 shadow flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Link href="/" className="text-sm underline hover:text-gray-200">
                Back to site
            </Link>
        </header>
    );
}
