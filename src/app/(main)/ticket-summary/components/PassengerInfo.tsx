type FlightInfo = {
    seat: string;
    meal: string;
    baggage: string;
};

type PassengerInfoProps = {
    name: string;
    email: string;
    phone: string;
    passport: string;
    departure: FlightInfo;
    return?: FlightInfo;
};

export default function PassengerInfo({
                                          name,
                                          email,
                                          phone,
                                          passport,
                                          departure,
                                          return: returnFlight,
                                      }: PassengerInfoProps) {
    return (
        <div className="bg-blue-50 p-6 rounded-md mx-4 sm:mx-6 mt-4 text-sm space-y-6">
            {/* Passenger Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-10">
                <div>
                    <p className="text-gray-600 font-medium">Full Name</p>
                    <p className="font-semibold">{name}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Email</p>
                    <p>{email}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Phone</p>
                    <p>{phone}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Passport</p>
                    <p>{passport}</p>
                </div>
            </div>

            {/* Flight Info */}
            <div className={`grid ${returnFlight ? 'grid-cols-1 sm:grid-cols-[1fr_1px_1fr] gap-6' : 'grid-cols-1'}`}>
                {/* Departure */}
                <div>
                    <p className="text-blue-600 font-medium mb-1">Departure Flight</p>
                    <p>Seat: {departure.seat}</p>
                    <p>Meal: {departure.meal}</p>
                    <p>Baggage: {departure.baggage}</p>
                </div>

                {/* Divider */}
                {returnFlight && <div className="hidden sm:block border-l border-gray-300 h-full" />}

                {/* Return */}
                {returnFlight && (
                    <div>
                        <p className="text-blue-600 font-medium mb-1">Return Flight</p>
                        <p>Seat: {returnFlight.seat}</p>
                        <p>Meal: {returnFlight.meal}</p>
                        <p>Baggage: {returnFlight.baggage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
