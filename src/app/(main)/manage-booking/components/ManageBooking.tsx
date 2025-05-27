'use client';

import React, {useEffect, useState} from 'react';
import {FaTicketAlt, FaSearch} from 'react-icons/fa';
import {trpc} from 'src/utils/trpc';
import PassengerTickets from "src/app/(main)/manage-booking/components/PassengerTickets";
import BoardingPass from "src/app/(main)/components/BoardingPass";
import PrimaryModal from "src/app/components/PrimaryModal";
import {FullTicket} from "src/constants/types";
import {Ticket} from "@prisma/client";
import {useQueryState} from 'nuqs';

export default function ManageBooking() {
    const [activeTab, setActiveTab] = useState<'booking' | 'email'>('booking');
    const [submitted, setSubmitted] = useState(false);
    const [bookingCode, setBookingCode] = useQueryState('reference');
    const [lastName, setLastName] = useQueryState('lastName');

    const [showTicket, setShowTicket] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<FullTicket | null>(null);

    const {
        data: bookingData,
        refetch,
        isFetching,
        error,
    } = trpc.bookings.findBookingByReference.useQuery(
        {reference: bookingCode ?? '', lastName: lastName ?? ''},
        {enabled: false}
    );

    const handleFindBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        await refetch();
    };

    const handleShowTicket = (ticketId: string) => {
        if (!bookingData) return;

        for (const passenger of bookingData.passengers) {
            const ticket = passenger.tickets.find((t: Ticket) => t.id === ticketId);

            if (ticket) {
                const fullTicket: FullTicket = {
                    ...ticket,
                    passenger: {
                        ...passenger,
                        meals: passenger.meals,
                        bags: passenger.bags,
                    },
                    segment: ticket.segment,
                    seat: ticket.seat,
                };

                setSelectedTicket(fullTicket);
                setShowTicket(true);
                break;
            }
        }
    };

    return (
        <>
            <section className="bg-white pt-24 px-4 sm:px-6 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-blue-900 text-center">
                    Manage Your Booking
                </h2>
                <p className="pt-4 text-gray-600 text-sm sm:text-base mb-10 max-w-3xl mx-auto text-center">
                    Check in online, change your flight, add extra luggage, select your seats, or purchase additional
                    services.
                </p>

                {/* Tab Switcher */}
                <div className="flex flex-col sm:flex-row max-w-2xl mx-auto rounded-xl overflow-hidden shadow mb-10">
                    <button
                        onClick={() => setActiveTab('booking')}
                        className={`flex items-center justify-center flex-1 py-3 px-6 font-medium text-sm sm:text-base ${
                            activeTab === 'booking' ? 'bg-white text-blue-900' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        <FaTicketAlt className="mr-2"/>
                        Booking Number
                    </button>
                    <button
                        onClick={() => setActiveTab('email')}
                        className={`flex items-center justify-center flex-1 py-3 px-6 font-medium text-sm sm:text-base ${
                            activeTab === 'email' ? 'bg-white text-blue-900' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        <FaSearch className="mr-2"/>
                        Email Search
                    </button>
                </div>

                {/* Form Container */}
                <div
                    className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow text-left text-sm">
                    {activeTab === 'booking' && (
                        <>
                            <h3 className="text-lg font-semibold mb-1">Find By Booking Reference</h3>
                            <p className="text-gray-500 mb-6">
                                Enter your booking number and last name to find your booking.
                            </p>

                            <form className="space-y-6" onSubmit={handleFindBooking}>
                                <div>
                                    <label className="block font-medium mb-1">Booking Reference</label>
                                    <input
                                        type="text"
                                        value={bookingCode ?? ''}
                                        onChange={(e) => setBookingCode(e.target.value)}
                                        placeholder="e.g., ABCDEF"
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName ?? ''}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="e.g., Smith"
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold"
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
                                        <h4 className="text-base font-semibold mb-2">Booking Details</h4>
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
                                                    {bookingData.passengers
                                                        .map((p: any) => p.firstName + ' ' + p.lastName)
                                                        .join(', ')}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Tickets Per Passenger */}
                                    {bookingData.passengers.map((p, i: number) => (
                                        <PassengerTickets
                                            onShowTicket={handleShowTicket}
                                            key={p.id}
                                            passengerIndex={i}
                                            fullName={`${p.firstName} ${p.lastName}`}
                                            tickets={p.tickets}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Email Search (Non-functional placeholder) */}
                    {activeTab === 'email' && (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Find By Email</h3>
                            <p className="text-gray-500 mb-6">
                                Enter the email address used during booking to find all your bookings.
                            </p>

                            <form className="space-y-6">
                                <div>
                                    <label className="block font-medium mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="e.g., john.smith@example.com"
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold"
                                >
                                    Find My Booking
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
            <PrimaryModal showModal={showTicket} setShowModal={setShowTicket} showCloseButton={false}>
                {selectedTicket && (
                    <BoardingPass
                        ticketId={selectedTicket.ticketNumber}
                        flightNumber={selectedTicket.segment.flightNumber}
                        from={{
                            code: selectedTicket.segment.departureAirport.code,
                            city: selectedTicket.segment.departureAirport.city,
                        }}
                        to={{
                            code: selectedTicket.segment.arrivalAirport.code,
                            city: selectedTicket.segment.arrivalAirport.city,
                        }}
                        date={new Date(selectedTicket.segment.departureTime).toLocaleDateString()}
                        time={`${new Date(selectedTicket.segment.departureTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })} → ${new Date(selectedTicket.segment.arrivalTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}`}
                        gate={selectedTicket.segment.gate ?? '-'}
                        boarding={selectedTicket.segment.departureTime
                            ? new Date(selectedTicket.segment.boardingTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                            : '-'}
                        passenger={{
                            name: `${selectedTicket.passenger.firstName} ${selectedTicket.passenger.lastName}`,
                            phone: selectedTicket.passenger.phoneNumber,
                            email: selectedTicket.passenger.email,
                        }}
                        seat={selectedTicket.seat?.seatNumber ?? '-'}
                        travelClass={selectedTicket.segment.fareClass}
                        baggage={`${selectedTicket.passenger.bags.reduce((sum, b) => sum + (b.type.maxWeight ?? 0), 0)}kg`}
                        meal={
                            selectedTicket.passenger.meals[0]?.type.name ?? 'Standard'
                        }
                        specialRequest={
                            selectedTicket.passenger.meals[0]?.type.description ?? ''
                        }
                        qrCodeUrl="/qrcode.jpg"
                        onReturn={() => setShowTicket(false)}
                    />
                )}
            </PrimaryModal>
        </>
    );
}
