'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useBookingStore} from 'src/store/bookingStore';
import {trpc} from 'src/utils/trpc';
import {useSeatStore} from "src/store/seatStore";

export function SeatLegend() {
    return (
        <div className="my-8 border rounded-md p-6 shadow-sm bg-white">
            <div className="grid grid-cols-2 gap-6 mb-4">
                <LegendItem color="bg-blue-200" label="Standard seat" price={10}/>
                <LegendItem color="bg-yellow-300" label="Premium seat" price={40}/>
                <LegendItem color="bg-blue-800" label="Selected seat"/>
                <LegendItemUnavailable label="Unavailable"/>
            </div>
            <div className="border-t pt-4 text-sm text-black font-semibold">
                <span className="font-bold">FD422</span> – Boeing 390-100AU
            </div>
        </div>
    );
}

const LegendItem = ({color, label, price}: { color: string; label: string; price?: number }) => (
    <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded shadow-md ${color}`}/>
        <div className="text-sm">
            <span className="font-medium">{label}</span>
            {price !== undefined && <><br/><span className="font-bold">${price}</span></>}
        </div>
    </div>
);

const LegendItemUnavailable = ({label}: { label: string }) => (
    <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-gray-400 shadow-md flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="4" x2="20" y2="20"/>
                <line x1="20" y1="4" x2="4" y2="20"/>
            </svg>
        </div>
        <div className="text-sm">
            <span className="font-medium">{label}</span>
        </div>
    </div>
);

const SeatSelection = () => {
    const router = useRouter();
    const passengers = useBookingStore((s) => s.currentBooking.passengers);
    const segment = useBookingStore((s) => s.currentBooking.itinerary.outbound); // change to 'return' if needed
    const updatePassengerTicketSeat = useBookingStore((s) => s.updatePassengerTicketSeat);

    const {data: seats, isLoading} = trpc.seats.getSeatsBySegment.useQuery(
        {segmentId: segment?.id ?? ''},
        {enabled: !!segment?.id}
    );

    const setSeatsForSegment = useSeatStore((s) => s.setSeatsForSegment);

    useEffect(() => {
        if (segment?.id && seats) {
            setSeatsForSegment(segment.id, seats);
        }
    }, [segment?.id, seats, setSeatsForSegment]);


    const getSelectedSeatId = (index: number) =>
        passengers[index].tickets.find((t) => t.segmentId === segment?.id)?.seatId;

    const handleSeatClick = (index: number, seatId: string) => {
        const current = getSelectedSeatId(index);
        if (!segment?.id) return;
        updatePassengerTicketSeat(index, segment, seatId === current ? '' : seatId);
    };

    const parseLayout = (seats: { seatNumber: string }[]) => {
        const layout: Record<number, Record<string, any>> = {};
        seats.forEach((seat) => {
            const match = seat.seatNumber.match(/^(\d+)([A-Z])$/);
            if (!match) return;
            const row = parseInt(match[1]);
            const col = match[2];
            layout[row] = layout[row] || {};
            layout[row][col] = seat;
        });
        return layout;
    };

    const layout = seats ? parseLayout(seats) : {};
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    const rows = Object.keys(layout).map(Number).sort((a, b) => a - b);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div className="text-center text-xl sm:text-2xl font-semibold mb-4">Select Your Seats</div>

            <SeatLegend />

            {isLoading && <p className="text-center text-gray-500">Loading seat map...</p>}

            {seats && passengers.map((p, index) => {
                const selected = getSelectedSeatId(index);
                return (
                    <div key={index} className="mb-6 border p-4 sm:p-6 rounded-md bg-white shadow-sm">
                        <p className="font-medium mb-2 text-sm sm:text-base">
                            Passenger {index + 1}: {p.firstName} {p.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {selected
                                ? `Selected seat: ${seats.find(s => s.id === selected)?.seatNumber}`
                                : 'No seat selected'}
                        </p>

                        <div className="w-full flex justify-center mt-4 overflow-x-auto">
                            <div className="w-full max-w-full sm:max-w-xl">
                                <div className="grid grid-cols-7 gap-2 justify-items-center">
                                    {columns.slice(0, 3).map(col => (
                                        <div key={`col-${col}`} className="text-sm font-medium text-center">{col}</div>
                                    ))}
                                    <div className="w-4" />
                                    {columns.slice(3).map(col => (
                                        <div key={`col-${col}`} className="text-sm font-medium text-center">{col}</div>
                                    ))}
                                </div>

                                {rows.map(row => (
                                    <div
                                        key={row}
                                        className="grid grid-cols-7 gap-2 justify-items-center items-center my-2 sm:my-4"
                                    >
                                        {columns.slice(0, 3).map(col => {
                                            const seat = layout[row]?.[col];
                                            return seat ? (
                                                <button
                                                    key={seat.id}
                                                    disabled={!seat.isAvailable}
                                                    onClick={() => handleSeatClick(index, seat.id)}
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded shadow-md text-xs ${
                                                        seat.id === selected
                                                            ? 'bg-blue-800 text-white'
                                                            : !seat.isAvailable
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : seat.price > 10
                                                                    ? 'bg-yellow-300 hover:bg-yellow-400'
                                                                    : 'bg-blue-200 hover:bg-blue-300'
                                                    }`}
                                                />
                                            ) : <div key={`empty-${row}-${col}`} className="w-8 h-8 sm:w-10 sm:h-10" />;
                                        })}

                                        <div className="text-xs sm:text-sm text-gray-500 font-semibold w-8 sm:w-10 text-center">{row}</div>

                                        {columns.slice(3).map(col => {
                                            const seat = layout[row]?.[col];
                                            return seat ? (
                                                <button
                                                    key={seat.id}
                                                    disabled={!seat.isAvailable}
                                                    onClick={() => handleSeatClick(index, seat.id)}
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded shadow-md text-xs ${
                                                        seat.id === selected
                                                            ? 'bg-blue-800 text-white'
                                                            : !seat.isAvailable
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : seat.price > 10
                                                                    ? 'bg-yellow-300 hover:bg-yellow-400'
                                                                    : 'bg-blue-200 hover:bg-blue-300'
                                                    }`}
                                                />
                                            ) : <div key={`empty-${row}-${col}`} className="w-8 h-8 sm:w-10 sm:h-10" />;
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 my-8">
                <button
                    onClick={() => router.back()}
                    className="w-full sm:w-auto bg-white border border-gray-300 px-6 py-3 rounded shadow hover:bg-gray-100"
                >
                    Back to Passenger Details
                </button>
                <button
                    onClick={() => router.push('/flight-baggages')}
                    className="w-full sm:w-auto bg-blue-800 text-white px-6 py-3 rounded shadow hover:bg-blue-900"
                >
                    Select your Baggage
                </button>
            </div>
        </div>
    );
};

export default SeatSelection;
