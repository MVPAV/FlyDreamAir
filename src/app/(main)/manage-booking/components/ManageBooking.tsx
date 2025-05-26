'use client';

import {useEffect, useState} from 'react';
import { FaTicketAlt, FaSearch } from 'react-icons/fa';
import { trpc } from 'src/utils/trpc';

export default function ManageBooking() {
    const [activeTab, setActiveTab] = useState<'booking' | 'email'>('booking');
    const [bookingCode, setBookingCode] = useState('');
    const [lastName, setLastName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const {
        data: bookingData,
        refetch,
        isFetching,
        error,
    } = trpc.bookings.findBookingByReference.useQuery(
        { reference: bookingCode, lastName },
        { enabled: false }
    );

    const handleFindBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        await refetch();
    };

    return (
        <section className="bg-white pt-24 px-6 text-center">
            <h2 className="text-4xl font-bold mb-2 text-blue-900">Manage Your Booking</h2>
            <p className="pt-6 text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                Check in online, change your flight, add extra luggage, select your seats, or purchase additional services.
            </p>

            {/* Tab Switcher */}
            <div className="flex max-w-4xl mx-auto rounded-xl overflow-hidden shadow mb-10">
                <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex items-center justify-center flex-1 py-4 px-8 font-medium text-base ${
                        activeTab === 'booking' ? 'bg-white text-blue-900' : 'bg-gray-200 text-gray-500'
                    }`}
                >
                    <FaTicketAlt className="mr-2" />
                    Booking Number
                </button>
                <button
                    onClick={() => setActiveTab('email')}
                    className={`flex items-center justify-center flex-1 py-4 px-8 font-medium text-base ${
                        activeTab === 'email' ? 'bg-white text-blue-900' : 'bg-gray-200 text-gray-500'
                    }`}
                >
                    <FaSearch className="mr-2" />
                    Email Search
                </button>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 border border-gray-200 shadow-lg text-left">
                {activeTab === 'booking' && (
                    <>
                        <h3 className="text-xl font-semibold mb-2">Find By Booking Reference</h3>
                        <p className="text-gray-500 mb-8">
                            Enter your booking number and last name to find your booking.
                        </p>

                        <form className="space-y-6" onSubmit={handleFindBooking}>
                            <div>
                                <label className="block text-sm font-medium mb-1">Booking Reference</label>
                                <input
                                    type="text"
                                    value={bookingCode}
                                    onChange={(e) => setBookingCode(e.target.value)}
                                    placeholder="e.g., ABCDEF"
                                    className="w-full border border-gray-300 rounded-lg p-4 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="e.g., Smith"
                                    className="w-full border border-gray-300 rounded-lg p-4 text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-lg font-semibold text-base"
                                disabled={isFetching}
                            >
                                {isFetching ? 'Searching...' : 'Find My Booking'}
                            </button>
                        </form>

                        {submitted && error && (
                            <p className="text-red-600 mt-4">Booking not found or error occurred.</p>
                        )}

                        {bookingData && (
                            <div className="mt-10 border-t pt-6 space-y-8">
                                {/* Booking Summary */}
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Booking Details</h4>
                                    <table className="text-sm w-full text-left">
                                        <tbody>
                                        <tr>
                                            <td className="font-medium py-1">Booking Code:</td>
                                            <td>{bookingData.bookingCode}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium py-1">Status:</td>
                                            <td>{bookingData.status}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium py-1">Total Price:</td>
                                            <td>${bookingData.totalPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium py-1">Passengers:</td>
                                            <td>
                                                {bookingData.passengers.map((p: any) => p.firstName + ' ' + p.lastName).join(', ')}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Tickets Per Passenger */}
                                {bookingData.passengers.map((p: any, i: number) => (
                                    <div key={p.id} className="bg-white shadow rounded-lg overflow-hidden border">
                                        <div className="bg-blue-50 px-6 py-4 border-b">
                                            <h3 className="text-blue-900 font-semibold text-lg">
                                                Passenger {i + 1}: {p.firstName + ' ' + p.lastName}
                                            </h3>
                                        </div>

                                        {p.tickets.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-sm">
                                                    <thead className="bg-gray-100 text-gray-700 text-left">
                                                    <tr>
                                                        <th className="px-6 py-3">Flight</th>
                                                        <th className="px-6 py-3">Route</th>
                                                        <th className="px-6 py-3">Departure</th>
                                                        <th className="px-6 py-3">Seat</th>
                                                        <th className="px-6 py-3">Ticket #</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                    {p.tickets.map((t: any) => (
                                                        <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-3 font-medium">{t.segment.flightNumber}</td>
                                                            <td className="px-6 py-3">
                                                                {t.segment.departureAirport.code} → {t.segment.arrivalAirport.code}
                                                            </td>
                                                            <td className="px-6 py-3 text-gray-700">
                                                                {new Date(t.segment.departureTime).toLocaleString(undefined, {
                                                                    weekday: 'short',
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </td>
                                                            <td className="px-6 py-3">{t.seat?.seatNumber || '—'}</td>
                                                            <td className="px-6 py-3">{t.ticketNumber}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4 text-gray-500 italic">No tickets found.</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'email' && (
                    <>
                        <h3 className="text-xl font-semibold mb-2">Find By Email</h3>
                        <p className="text-gray-500 mb-8">
                            Enter the email address used during booking to find all your bookings.
                        </p>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="e.g., john.smith@example.com"
                                    className="w-full border border-gray-300 rounded-lg p-4 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-lg font-semibold text-base"
                            >
                                Find My Booking
                            </button>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}
