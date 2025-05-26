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

const formatDateTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
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

            {tickets.length > 0 ? (
                <div className="divide-y divide-gray-200">
                    {tickets.map((t) => (
                        <div key={t.id} className="px-4 py-4">
                            <div className="mb-2">
                                <span className="font-medium text-gray-600">Flight:</span>{' '}
                                {t.segment.flightNumber}
                            </div>
                            <div className="mb-2">
                                <span className="font-medium text-gray-600">Route:</span>{' '}
                                {t.segment.departureAirport.code} → {t.segment.arrivalAirport.code}
                            </div>
                            <div className="mb-2">
                                <span className="font-medium text-gray-600">Departure:</span>{' '}
                                {formatDateTime(t.segment.departureTime.toLocaleDateString())}
                            </div>
                            <div className="mb-2">
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
    );
};

export default PassengerTickets;
