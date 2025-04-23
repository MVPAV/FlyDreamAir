import FlightCard from "./FlightCard";

const FlightSearchResults = () => {
    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-2xl font-bold">Flight Search Results</h1>
                <p className="text-gray-700 text-sm mt-1">
                    From: <strong>SYD</strong> &nbsp; To: <strong>MEL</strong> &nbsp; Depart: <strong>22-04-2025</strong> &nbsp;
                    Return: <strong>27-04-2025</strong> &nbsp; Passengers: <strong>1</strong> &nbsp; Class: <strong>Economy</strong>
                </p>
            </div>

            {/* Sorting Controls */}
            <div className="max-w-7xl mx-auto flex gap-3 mb-6">
                <button className="bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold">Price</button>
                <button className="bg-white border px-5 py-2 rounded-full text-sm">Departure Time</button>
                <button className="bg-white border px-5 py-2 rounded-full text-sm">Duration</button>
            </div>

            {/* Flight Lists */}
            <div className="max-w-7xl mx-auto space-y-10">
                <section>
                    <h2 className="font-semibold text-lg mb-4">SYD to MEL - 22 April 2025</h2>
                    <div className="space-y-4">
                        {/* Map outbound flights here */}
                        {/* Example: */}
                        <FlightCard
                            airline="FlyDreamAir"
                            flightNo="FD422"
                            departTime="15:30"
                            arriveTime="17:15"
                            from="SYD"
                            to="MEL"
                            duration="1h 45m"
                            baggage="20kg"
                            aircraft="Airbus A320"
                            price="$102"
                            seatsLeft={18}
                        />
                        {/* Add other FlightCard components */}
                    </div>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-4">MEL to SYD - 27 April 2025</h2>
                    <FlightCard
                        airline="FlyDreamAir"
                        flightNo="FD205"
                        departTime="9:45"
                        arriveTime="11:30"
                        from="MEL"
                        to="SYD"
                        duration="1h 45m"
                        baggage="20kg"
                        aircraft="Airbus A320"
                        price="$192"
                        seatsLeft={22}
                    />
                </section>
            </div>
        </div>
    );
};

export default FlightSearchResults;
