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
    return: FlightInfo;
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
        <div className="bg-blue-50 p-6 rounded-md mx-4 sm:mx-6 mt-4 text-sm flex ">
            <div>
                <p className="font-semibold">{name}</p>
                <p>Email: {email}</p>
                <p>Passport: {passport}</p>
                <p className="text-blue-600 font-medium mt-2">Departure flight:</p>
                <p>Seat: {departure.seat}</p>
                <p>Meal: {departure.meal}</p>
                <p>Baggage: {departure.baggage}</p>
            </div>

            <div className="border-l border-gray-400 h-auto mt-16 ml-48"></div>

            <div className="ml-10 pt-5 text-left">
                <p className="text-left">Phone: {phone}</p>
                <p className="text-blue-600 font-medium mt-2 text-left pt-5">Return flight:</p>
                <p className="text-left">Seat: {returnFlight.seat}</p>
                <p className="text-left">Meal: {returnFlight.meal}</p>
                <p className="text-left">Baggage: {returnFlight.baggage}</p>
            </div>
        </div>
    );
}
