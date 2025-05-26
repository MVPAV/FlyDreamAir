'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUsers, FaHome, FaUserFriends } from 'react-icons/fa';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <FaHome /> },
    { label: 'Users', href: '/admin/users', icon: <FaUsers /> },
    { label: 'Passengers', href: '/admin/passengers', icon: <FaUserFriends /> },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="bg-white w-64 min-h-screen shadow-md border-r p-6 hidden md:block">
            <nav className="space-y-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-2 text-sm font-medium ${
                            pathname === item.href
                                ? 'text-blue-800 font-semibold'
                                : 'text-gray-700 hover:text-blue-600'
                        }`}
                    >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
