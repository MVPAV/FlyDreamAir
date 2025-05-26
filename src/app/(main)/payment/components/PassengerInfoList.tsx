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

const formatList = (items: string[]) => items.length ? items.join(", ") : "None";

const PassengerInfoList: React.FC<PassengerInfoListProps> = ({ passengers }) => {
    return (
        <section className="mt-7">
            <h2 className="text-black text-2xl font-semibold mb-[29px]">Passenger Information</h2>
            {passengers.map((p, i) => (
                <div
                    key={i}
                    className="bg-[rgba(238,243,251,1)] flex w-full gap-5 text-black font-medium flex-wrap justify-between pl-[37px] pr-20 py-[22px] rounded-[15px] mb-6"
                >
                    {/* Left column */}
                    <div className="flex flex-col">
                        <div className="font-semibold">{p.name}</div>
                        <div className="mt-2">Email: {p.email}</div>
                        <div className="mt-2.5">Passport number: {p.passportNumber}</div>
                        <div className="text-[rgba(5,12,156,1)] mt-3.5">Departure flight:</div>
                        <div className="mt-2.5">Seat selection: {p.departureInfo.seat}</div>
                        <div className="mt-2.5">Meal: {formatList(p.departureInfo.meals)}</div>
                        <div className="mt-2.5">Baggage: {formatList(p.departureInfo.baggages)}</div>
                    </div>

                    {/* Divider + Right column */}
                    {p.returnInfo && (
                        <>
                            <div className="border w-px h-auto mt-[109px] border-[rgba(0,0,0,0.2)]" />
                            <div className="flex flex-col mt-[33px]">
                                <div>Phone: {p.phone}</div>
                                <div className="text-[rgba(0,0,160,1)] mt-[50px]">Return flight:</div>
                                <div className="mt-2.5">Seat selection: {p.returnInfo.seat}</div>
                                <div className="mt-2.5">Meal: {formatList(p.returnInfo.meals)}</div>
                                <div className="mt-2.5">Baggage: {formatList(p.returnInfo.baggages)}</div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
};

export default PassengerInfoList;
