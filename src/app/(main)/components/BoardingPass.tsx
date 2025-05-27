import Image from 'next/image';
import { JSX } from 'react';
import {
    FaPlaneDeparture,
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaUser,
    FaUtensils
} from 'react-icons/fa';

type Passenger = {
    name: string;
    phone: string;
    email: string;
};

type BoardingPassProps = {
    flightNumber: string;
    ticketId: string;
    from: { code: string; city: string };
    to: { code: string; city: string };
    date: string;
    time: string;
    gate: string;
    boarding: string;
    passenger: Passenger;
    seat: string;
    travelClass: string;
    baggage: string;
    meal: string;
    specialRequest?: string;
    qrCodeUrl: string;
    onReturn?: () => void;
};

export default function BoardingPass({
                                         flightNumber,
                                         ticketId,
                                         from,
                                         to,
                                         date,
                                         time,
                                         gate,
                                         boarding,
                                         passenger,
                                         seat,
                                         travelClass,
                                         baggage,
                                         meal,
                                         specialRequest,
                                         qrCodeUrl,
                                         onReturn
                                     }: BoardingPassProps) {
    return (
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden font-sans p-6 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-5 rounded-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">FlyDreamAir</h2>
                    <span className="bg-blue-800 px-3 py-1 rounded text-sm font-mono">#{ticketId}</span>
                </div>
                <div className="grid grid-cols-3 text-center sm:flex sm:justify-between sm:items-center mt-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-widest">{from.code}</h1>
                        <p className="text-sm">{from.city}</p>
                    </div>
                    <div>
                        <FaPlaneDeparture className="text-3xl mx-auto" />
                        <p className="text-sm mt-1">{flightNumber}</p>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-widest">{to.code}</h1>
                        <p className="text-sm">{to.city}</p>
                    </div>
                </div>
            </div>

            {/* Flight Info */}
            <div className="bg-gray-100 p-5 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <FlightInfo icon={<FaCalendarAlt />} title="Date" value={date} />
                    <FlightInfo icon={<FaClock />} title="Time" value={time} />
                    <FlightInfo icon={<FaMapMarkerAlt />} title="Gate" value={gate} />
                    <FlightInfo icon={<FaClock />} title="Boarding" value={boarding} />
                </div>
            </div>

            {/* Passenger Info */}
            <div className="bg-gray-100 p-5 rounded-xl">
                <div className="flex items-start gap-3 sm:gap-4 flex-wrap">
                    <div className="text-blue-600 text-xl mt-1 shrink-0">
                        <FaUser />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold text-base mb-3">Passenger Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <PassengerDetail label="Full Name" value={passenger.name} />
                            <PassengerDetail label="Phone Number" value={passenger.phone} />
                            <PassengerDetail label="Email" value={passenger.email} full />
                        </div>
                    </div>
                </div>
            </div>

            {/* Seat & Class */}
            <div className="bg-gray-100 p-5 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <InfoCard label="Seat" value={seat} accent="text-blue-600" />
                <InfoCard label="Class" value={travelClass} />
                <InfoCard label="Baggage" value={baggage} />
            </div>

            {/* Meal Selection */}
            <div className="bg-gray-100 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <FaUtensils className="text-blue-600" />
                    <p className="font-semibold text-sm">Meal Selection</p>
                </div>
                <p className="text-sm">{meal}</p>
                {specialRequest && (
                    <p className="text-sm text-gray-500">Special request: {specialRequest}</p>
                )}
            </div>

            {/* QR Code */}
            <div className="bg-gray-100 p-6 rounded-xl text-center">
                <Image src={qrCodeUrl} alt="QR Code" width={128} height={128} className="mx-auto" />
                <p className="text-xs text-gray-600 mt-2">Scan at the airport</p>
            </div>

            {/* Return Button */}
            <div>
                <button
                    onClick={onReturn}
                    className="w-full bg-blue-700 hover:bg-blue-800 transition duration-200 text-white font-semibold py-3 rounded-lg"
                >
                    Return
                </button>
            </div>
        </div>
    );
}

// Reusable Components
function FlightInfo({ icon, title, value }: { icon: JSX.Element; title: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg mt-1">{icon}</div>
            <div>
                <p className="font-semibold">{title}</p>
                <p>{value}</p>
            </div>
        </div>
    );
}

function PassengerDetail({
                             label,
                             value,
                             full = false
                         }: {
    label: string;
    value: string;
    full?: boolean;
}) {
    return (
        <div className={full ? 'sm:col-span-2' : ''}>
            <p className="text-gray-600 font-light">{label}:</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}

function InfoCard({ label, value, accent = '' }: { label: string; value: string; accent?: string }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`font-semibold ${accent}`}>{value}</p>
        </div>
    );
}
