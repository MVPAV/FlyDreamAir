'use client';

import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React from 'react';

export default function AdminUsersPage() {
    const { data: users = [], refetch, isLoading } = trpc.admin.getAllUsers.useQuery();
    const deleteUser = trpc.admin.deleteUser.useMutation();
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

    const filtered = users.filter((u) =>
        `${u.firstName ?? ''} ${u.lastName ?? ''} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        setDeletingId(id);
        await deleteUser.mutateAsync({ userId: id });
        await refetch();
        setDeletingId(null);
    };

    return (
        <section className="px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-3xl font-bold text-blue-900">User Management</h1>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-4 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-xl bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-50 text-gray-600 uppercase text-xs tracking-wide">
                    <tr>
                        <th className="px-6 py-3">First Name</th>
                        <th className="px-6 py-3">Last Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Created</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-6 text-center text-gray-500">Loading users...</td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-6 text-center text-gray-500">No users found.</td>
                        </tr>
                    ) : (
                        filtered.map((user) => (
                            <React.Fragment key={user.id}>
                                <tr className="border-t hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4">{user.firstName || '—'}</td>
                                    <td className="px-6 py-4">{user.lastName || '—'}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <button
                                            onClick={() =>
                                                setExpandedUserId(expandedUserId === user.id ? null : user.id)
                                            }
                                            className="text-blue-600 hover:text-blue-800 transition"
                                            title="Toggle bookings"
                                        >
                                            {expandedUserId === user.id ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 transition"
                                            disabled={deletingId === user.id}
                                            title="Delete User"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>

                                {expandedUserId === user.id && (
                                    <tr className="bg-gray-50 border-t">
                                        <td colSpan={4} className="px-6 py-4">
                                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                                    Bookings ({user.bookings?.length || 0})
                                                </h3>
                                                {user.bookings?.length > 0 ? (
                                                    <table className="w-full text-xs table-fixed">
                                                        <thead className="text-gray-600 bg-gray-100 rounded-md">
                                                        <tr>
                                                            <th className="px-2 py-2">Booking Code</th>
                                                            <th className="px-2 py-2">Booked At</th>
                                                            <th className="px-2 py-2">Total Price</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {user.bookings.map((b: any) => (
                                                            <tr key={b.id} className="border-t text-gray-800">
                                                                <td className="px-2 py-2 font-mono text-blue-800">
                                                                    {b.bookingCode}
                                                                </td>
                                                                <td className="px-2 py-2">{b.bookedAt.toLocaleDateString()}</td>
                                                                <td className="px-2 py-2">${b.totalPrice.toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p className="text-sm text-gray-500">No bookings found.</p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
