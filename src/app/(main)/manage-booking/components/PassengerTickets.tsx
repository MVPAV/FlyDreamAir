import React from 'react';

interface Ticket {
    id: string;
    seat?: { seatNumber: string };
    ticketNumber: string;
    segment: {
        flightNumber: string;
        departureAirport: { code: string };
        arrivalAirport: { code: string };
        departureTime: Date;
    };
}

interface PassengerTicketsProps {
    passengerIndex: number;
    fullName: string;
    tickets: Ticket[];
    onShowTicket: (ticketId: string) => void;
}

const formatDate = (date: Date) =>
    new Date(date).toLocaleString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

const PassengerTickets: React.FC<PassengerTicketsProps> = ({
                                                               passengerIndex,
                                                               fullName,
                                                               tickets,
                                                               onShowTicket,
                                                           }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden text-sm mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <h3 className="text-blue-900 font-semibold text-base">
                    Passenger {passengerIndex + 1}: <span className="font-bold">{fullName}</span>
                </h3>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                {tickets.length > 0 ? (
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wide border-b">
                        <tr>
                            <th className="px-6 py-3">Flight</th>
                            <th className="px-6 py-3">Route</th>
                            <th className="px-6 py-3">Departure</th>
                            <th className="px-6 py-3">Seat</th>
                            <th className="px-6 py-3">Ticket #</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-800">
                        {tickets.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium">{t.segment.flightNumber}</td>
                                <td className="px-6 py-4">
                                    {t.segment.departureAirport.code} → {t.segment.arrivalAirport.code}
                                </td>
                                <td className="px-6 py-4">{formatDate(t.segment.departureTime)}</td>
                                <td className="px-6 py-4">{t.seat?.seatNumber || '—'}</td>
                                <td className="px-6 py-4">{t.ticketNumber}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onShowTicket(t.id)}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                                    >
                                        Show Ticket
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-6 py-4 text-gray-500 italic">No tickets found.</div>
                )}
            </div>

            {/* Mobile Card Layout */}
            <div className="block md:hidden">
                {tickets.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {tickets.map((t) => (
                            <div key={t.id} className="p-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm space-y-2">
                                    <div>
                                        <span className="text-gray-500 font-medium">Flight:</span>{' '}
                                        <span className="text-gray-900">{t.segment.flightNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 font-medium">Route:</span>{' '}
                                        <span className="text-gray-900">
                                            {t.segment.departureAirport.code} → {t.segment.arrivalAirport.code}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 font-medium">Departure:</span>{' '}
                                        <span className="text-gray-900">{formatDate(t.segment.departureTime)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 font-medium">Seat:</span>{' '}
                                        <span className="text-gray-900">{t.seat?.seatNumber || '—'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 font-medium">Ticket #:</span>{' '}
                                        <span className="text-gray-900">{t.ticketNumber}</span>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={() => onShowTicket(t.id)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                        >
                                            Show Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-4 py-4 text-gray-500 italic">No tickets found.</div>
                )}
            </div>
        </div>
    );
};

export default PassengerTickets;
