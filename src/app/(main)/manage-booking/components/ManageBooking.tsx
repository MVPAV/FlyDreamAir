'use client'

import {useState} from 'react';
import {FaTicketAlt, FaSearch} from 'react-icons/fa';

export default function ManageBooking() {
    const [activeTab, setActiveTab] = useState('booking');

    return (
        <section className="bg-white pt-24 px-6 text-center">
            <h2 className="text-4xl font-bold mb-2 text-blue-900">
                Manage Your Booking
            </h2>
            <p className="pt-6 text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                Check in online, change your flight, add extra luggage, select your seats, or purchase additional
                services.
            </p>

            {/* Tab Switcher */}
            <div className="flex max-w-4xl mx-auto rounded-xl overflow-hidden shadow mb-10">
                <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex items-center justify-center flex-1 py-4 px-8 font-medium text-base ${
                        activeTab === 'booking'
                            ? 'bg-white text-blue-900'
                            : 'bg-gray-200 text-gray-500'
                    }`}
                >
                    <FaTicketAlt className="mr-2"/>
                    Booking Number
                </button>
                <button
                    onClick={() => setActiveTab('email')}
                    className={`flex items-center justify-center flex-1 py-4 px-8 font-medium text-base ${
                        activeTab === 'email'
                            ? 'bg-white text-blue-900'
                            : 'bg-gray-200 text-gray-500'
                    }`}
                >
                    <FaSearch className="mr-2"/>
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

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Booking Reference</label>
                                <input
                                    type="text"
                                    placeholder="e.g., ABCDEF"
                                    className="w-full border border-gray-300 rounded-lg p-4 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Smith"
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
