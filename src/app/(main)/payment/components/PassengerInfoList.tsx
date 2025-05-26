import React from "react";

interface FlightInfo {
    seat: string;
    meals: string[];
    baggages: string[];
}

interface Passenger {
    name: string;
    email: string;
    phone: string;
    passportNumber: string;
    departureInfo: FlightInfo;
    returnInfo?: FlightInfo;
}

interface PassengerInfoListProps {
    passengers: Passenger[];
}

const formatList = (items: string[]) => (items.length ? items.join(", ") : "None");

const PassengerInfoList: React.FC<PassengerInfoListProps> = ({ passengers }) => {
    return (
        <section className="mt-6 px-4 sm:px-6 lg:px-0">
            <h2 className="text-black text-lg font-semibold mb-5 text-center md:text-left">
                Passenger Information
            </h2>

            {passengers.map((p, i) => (
                <div
                    key={i}
                    className="bg-[#eef3fb] w-full rounded-xl p-4 sm:p-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4 text-sm text-black"
                >
                    {/* Departure Column */}
                    <div className="flex flex-col flex-1">
                        <div className="font-semibold text-base">{p.name}</div>
                        <div className="mt-2">Email: {p.email}</div>
                        <div className="mt-2">Passport number: {p.passportNumber}</div>

                        <div className="text-blue-900 mt-4 font-medium">Departure flight:</div>
                        <div className="mt-2">Seat selection: {p.departureInfo.seat}</div>
                        <div className="mt-1.5">Meal: {formatList(p.departureInfo.meals)}</div>
                        <div className="mt-1.5">Baggage: {formatList(p.departureInfo.baggages)}</div>
                    </div>

                    {/* Divider & Return Column */}
                    {p.returnInfo && (
                        <>
                            <div className="hidden md:block w-px bg-black/20 mx-4" />

                            <div className="flex flex-col flex-1 mt-2 md:mt-[2.5rem]">
                                <div>Phone: {p.phone}</div>

                                <div className="text-blue-800 mt-6 font-medium">Return flight:</div>
                                <div className="mt-2">Seat selection: {p.returnInfo.seat}</div>
                                <div className="mt-1.5">Meal: {formatList(p.returnInfo.meals)}</div>
                                <div className="mt-1.5">Baggage: {formatList(p.returnInfo.baggages)}</div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
};

export default PassengerInfoList;
