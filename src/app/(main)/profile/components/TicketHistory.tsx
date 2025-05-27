"use client";

import {useSession} from "next-auth/react";
import {trpc} from "src/utils/trpc";
import {Eye} from "lucide-react";
import BoardingPass from "src/app/(main)/components/BoardingPass";
import PrimaryModal from "src/app/components/PrimaryModal";
import React, {useState} from "react";
import {FullTicket} from "src/constants/types";

export default function TicketHistory() {
    const {data: session} = useSession();
    const userId = session?.user?.id;

    const [showTicket, setShowTicket] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<FullTicket | null>(null);

    const {data: bookings = [], isLoading} = trpc.users.getUserBookingss.useQuery();

    if (!userId) {
        return <p className="text-center text-gray-500 mt-10">Please sign in to view your tickets.</p>;
    }

    if (isLoading) {
        return <p className="text-center text-gray-500 mt-10">Loading your tickets...</p>;
    }

    if (bookings.length === 0) {
        return <p className="text-center text-gray-500 mt-10">You have no bookings yet.</p>;
    }

    const getBookingStatus = (segments: typeof bookings[0]["itinerary"]["segments"]) => {
        const now = new Date();
        return segments.some(seg => new Date(seg.departureTime) > now) ? "Upcoming" : "Completed";
    };

    const handleShowTicket = (ticketId: string) => {
        const booking = bookings.find((b) =>
            b.passengers.some((p) => p.tickets.some((t) => t.id === ticketId))
        );

        if (!booking) return;

        for (const passenger of booking.passengers) {
            const ticket = passenger.tickets.find((t) => t.id === ticketId);

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
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Your Flight Tickets</h2>
                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const status = getBookingStatus(booking.itinerary.segments);

                        return (
                            <div key={booking.id} className="border rounded-md p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-lg">Booking #{booking.bookingCode}</p>
                                    <span
                                        className={`text-sm px-2 py-1 rounded-full font-medium ${
                                            status === "Upcoming"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-200 text-gray-600"
                                        }`}
                                    >
                                        {status}
                                    </span>
                                </div>

                                {booking.itinerary.segments.map((segment, index) => (
                                    <div key={segment.id} className="flex flex-col gap-2 pl-1 pt-2">
                                        <p className="text-sm text-gray-700">
                                            Segment {index + 1}: {segment.departureAirport.code} →{" "}
                                            {segment.arrivalAirport.code} ・{" "}
                                            {new Date(segment.departureTime).toLocaleDateString()}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {booking.passengers.map((p) => {
                                                const ticket = p.tickets.find((t) => t.segmentId === segment.id);
                                                if (!ticket) return null;
                                                return (
                                                    <button
                                                        key={p.id + segment.id}
                                                        onClick={() => handleShowTicket(ticket.id)}
                                                        className="flex items-center gap-1 text-xs border px-3 py-1 rounded-md hover:bg-gray-50"
                                                    >
                                                        <Eye className="w-4 h-4"/>
                                                        {p.firstName} {p.lastName}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

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
