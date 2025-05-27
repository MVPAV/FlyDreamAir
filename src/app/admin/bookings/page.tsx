'use client';

import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React from 'react';

export default function AdminBookingsPage() {
    const { data: bookings = [], refetch, isLoading } = trpc.admin.getAllBookings.useQuery();
    const deleteBooking = trpc.admin.deleteBooking.useMutation();
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

    const filtered = bookings.filter((b) =>
        `${b.bookingCode} ${b.user?.email ?? ''}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;
        setDeletingId(id);
        await deleteBooking.mutateAsync({ bookingId: id });
        await refetch();
        setDeletingId(null);
    };

    return (
        <section className="px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-3xl font-bold text-blue-900">Booking Management</h1>
                <input
                    type="text"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-4 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-xl bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-50 text-gray-600 uppercase text-xs tracking-wide">
                    <tr>
                        <th className="px-6 py-3">Booking Code</th>
                        <th className="px-6 py-3">User Email</th>
                        <th className="px-6 py-3">Booked At</th>
                        <th className="px-6 py-3">Total Price</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                                Loading bookings...
                            </td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                                No bookings found.
                            </td>
                        </tr>
                    ) : (
                        filtered.map((booking) => (
                            <React.Fragment key={booking.id}>
                                <tr className="border-t hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 font-mono text-blue-800">{booking.bookingCode}</td>
                                    <td className="px-6 py-4">{booking.user?.email || '—'}</td>
                                    <td className="px-6 py-4">{new Date(booking.bookedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">${booking.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <button
                                            onClick={() =>
                                                setExpandedBookingId(
                                                    expandedBookingId === booking.id ? null : booking.id
                                                )
                                            }
                                            className="text-blue-600 hover:text-blue-800 transition"
                                            title="Toggle passengers"
                                        >
                                            {expandedBookingId === booking.id ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(booking.id)}
                                            className="text-red-600 hover:text-red-800 transition"
                                            disabled={deletingId === booking.id}
                                            title="Delete booking"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                                {expandedBookingId === booking.id && (
                                    <tr className="bg-gray-50 border-t">
                                        <td colSpan={5} className="px-6 py-4">
                                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                                    Passengers ({booking.passengers?.length || 0})
                                                </h3>
                                                {booking.passengers?.length > 0 ? (
                                                    <table className="w-full text-xs table-fixed">
                                                        <thead className="text-gray-600 bg-gray-100 rounded-md">
                                                        <tr>
                                                            <th className="px-2 py-2">Title</th>
                                                            <th className="px-2 py-2">First Name</th>
                                                            <th className="px-2 py-2">Last Name</th>
                                                            <th className="px-2 py-2">Email</th>
                                                            <th className="px-2 py-2">Phone</th>
                                                            <th className="px-2 py-2">Passport</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {booking.passengers.map((p) => (
                                                            <tr key={p.id} className="border-t text-gray-800">
                                                                <td className="px-2 py-2">{p.title}</td>
                                                                <td className="px-2 py-2">{p.firstName}</td>
                                                                <td className="px-2 py-2">{p.lastName}</td>
                                                                <td className="px-2 py-2">{p.email}</td>
                                                                <td className="px-2 py-2">{p.phoneNumber}</td>
                                                                <td className="px-2 py-2">{p.passport}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p className="text-sm text-gray-500">No passengers found.</p>
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
