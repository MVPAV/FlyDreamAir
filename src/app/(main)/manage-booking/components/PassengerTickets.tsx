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
                                                           }) => {
    return (
        <div className="bg-white border rounded-lg shadow overflow-hidden text-sm mb-6">
            <div className="bg-blue-50 px-4 py-3 border-b">
                <h3 className="text-blue-900 font-semibold">
                    Passenger {passengerIndex + 1}: {fullName}
                </h3>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                {tickets.length > 0 ? (
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
                        {tickets.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 font-medium">{t.segment.flightNumber}</td>
                                <td className="px-6 py-3">
                                    {t.segment.departureAirport.code} → {t.segment.arrivalAirport.code}
                                </td>
                                <td className="px-6 py-3 text-gray-700">{formatDate(t.segment.departureTime)}</td>
                                <td className="px-6 py-3">{t.seat?.seatNumber || '—'}</td>
                                <td className="px-6 py-3">{t.ticketNumber}</td>
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
                            <div key={t.id} className="px-4 py-4">
                                <div className="mb-1">
                                    <span className="font-medium text-gray-600">Flight:</span>{' '}
                                    {t.segment.flightNumber}
                                </div>
                                <div className="mb-1">
                                    <span className="font-medium text-gray-600">Route:</span>{' '}
                                    {t.segment.departureAirport.code} → {t.segment.arrivalAirport.code}
                                </div>
                                <div className="mb-1">
                                    <span className="font-medium text-gray-600">Departure:</span>{' '}
                                    {formatDate(t.segment.departureTime)}
                                </div>
                                <div className="mb-1">
                                    <span className="font-medium text-gray-600">Seat:</span>{' '}
                                    {t.seat?.seatNumber || '—'}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Ticket #:</span>{' '}
                                    {t.ticketNumber}
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
