"use client"

import {useState} from "react";

export function SeatLegend() {
    return (
        <div className="my-8 border rounded-md p-6 shadow-sm bg-white">
            <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-blue-200 shadow-md"/>
                    <div className="text-sm">
                        <span className="font-medium">Standard seat</span><br/>
                        <span className="font-bold">$10</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-yellow-300 shadow-md"/>
                    <div className="text-sm">
                        <span className="font-medium">Premium seat</span><br/>
                        <span className="font-bold">$40</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-blue-800 shadow-md"/>
                    <div className="text-sm">
                        <span className="font-medium">Selected seats</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-400 shadow-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            <line x1="4" y1="4" x2="20" y2="20"/>
                            <line x1="20" y1="4" x2="4" y2="20"/>
                        </svg>
                    </div>
                    <div className="text-sm">
                        <span className="font-medium">Unavailable</span>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4 text-sm text-black font-semibold">
                <span className="font-bold">FD422</span> – Boeing 390-100AU
            </div>
        </div>
    );
}

const SeatSelection = () => {
    const rows = [3, 4, 5, 6, 7, 8, 9, 10, 11];
    const columns = ["A", "B", "C", "D", "E", "F"];

    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const unavailableSeats = ["C4", "F4", "D7", "A8", "F8", "E8", "D9"];
    const premiumSeats = new Set(rows.flatMap(r => r >= 3 && r <= 5 ? columns.map(c => c + r) : []));

    const getSeatClass = (seatId: string) => {
        if (unavailableSeats.includes(seatId)) return "bg-gray-400 cursor-not-allowed";
        if (seatId === selectedSeat) return "bg-blue-800 text-white";
        if (premiumSeats.has(seatId)) return "bg-yellow-300 hover:bg-yellow-400";
        return "bg-blue-200 hover:bg-blue-300";
    };

    const handleSeatClick = (seatId: string) => {
        if (unavailableSeats.includes(seatId)) return;
        setSelectedSeat(seatId === selectedSeat ? null : seatId);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 mt-4">
            <div className="text-center text-xl font-semibold mb-4">Select Your Seats</div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-md font-medium">SYD - MEL</div>
                <div className="text-blue-500 cursor-pointer">Skip Seat Selections</div>
            </div>

            <div className="mb-4 border p-4 rounded-md">
                <p className="font-medium">1. James Smith</p>
                <p className="text-sm text-gray-500">{selectedSeat ? `Selected seat: ${selectedSeat}` : "No seats selected"}</p>
            </div>

            <SeatLegend/>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-xl">
                    <div className="grid grid-cols-7 gap-2 justify-items-center">

                        {columns.slice(0, 3).map((col) => (
                            <div key={`col-${col}`} className="font-medium text-sm text-center">
                                {col}
                            </div>
                        ))}
                        <div></div>
                        {columns.slice(3).map((col) => (
                            <div key={`col-${col}`} className="font-medium text-sm text-center">
                                {col}
                            </div>
                        ))}
                    </div>

                    {rows.map((row) => (
                        <div key={`row-${row}`}
                             className="grid grid-cols-7 gap-2 justify-items-center items-center my-8">

                            {columns.slice(0, 3).map((col) => {
                                const seatId = `${col}${row}`;
                                return (
                                    <button
                                        key={seatId}
                                        className={`pb-8 w-10 h-10 rounded shadow-blue-200/50 shadow-[6px_4px_10px_rgba(0,0,0,0.4)] ${getSeatClass(seatId)}`}
                                        onClick={() => handleSeatClick(seatId)}
                                    />
                                );
                            })}
                            <div className="text-sm font-semibold text-gray-500 w-10 text-center">{row}</div>
                            {columns.slice(3).map((col) => {
                                const seatId = `${col}${row}`;
                                return (
                                    <button
                                        key={seatId}
                                        className={`pb-8 w-10 h-10 rounded shadow-blue-200/50 shadow-[6px_4px_10px_rgba(0,0,0,0.4)] ${getSeatClass(seatId)}`}
                                        onClick={() => handleSeatClick(seatId)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between my-8">
                <button className="bg-white border border-gray-300 px-4 py-2 rounded">Back to Passenger Details</button>
                <button className="bg-blue-800 text-white px-4 py-2 rounded">Next Flight</button>
            </div>
        </div>
    );
};

export default SeatSelection;
