import FlightSummaryHeader from "src/app/(main)/components/FlightSummaryHeader";
import PassengerInfo from "src/app/(main)/ticket-summary/components/PassengerInfo";
import BookingSummary from "src/app/(main)/ticket-summary/components/BookingSummary";
import ProceedButton from "src/app/(main)/ticket-summary/components/ProceedButton";
import { BookingSummaryData } from "src/app/(main)/ticket-summary/types";


export default function TicketSummary()
{
    const data: BookingSummaryData = {
        fares: [
            {
                label: "Adult x 1",
                details: [{ route: "Fare", value: "Included", price: 196 }],
            },
        ],
        seats: [
            {
                label: "Passenger 1",
                details: [
                    { route: "SYD to MEL", value: "6F", price: 10 },
                    { route: "MEL to SYD", value: "5A", price: 40 },
                ],
            },
        ],
        baggage: [
            {
                label: "Passenger 1",
                details: [
                    { route: "SYD to MEL", value: "1 Standard", price: 30 },
                    { route: "MEL to SYD", value: "1 Standard, 1 Oversized", price: 80 },
                ],
            },
        ],
        meal: [
            {
                label: "Passenger 1",
                details: [
                    { route: "SYD to MEL", value: "1 Standard meal", price: 0 },
                    { route: "MEL to SYD", value: "1 Premium meal", price: 50 },
                ],
            },
        ],
    };

    const total = Object.values(data).flatMap(section =>
        section.flatMap(item =>
            item.details.map(d => d.price || 0)
        )
    ).reduce((sum, price) => sum + price, 0);


    return (
        <div className="pt-12">
            <FlightSummaryHeader
                departureCode="SYD"
                destinationCode="MEL"
                departureDate="22-04-2025"
                returnDate="27-04-2025"
                passengers={1}
                flightClass="Economy"
            />
            <div className="max-w-4xl mx-auto border rounded-md shadow-sm bg-white -mt-6">
                <h1 className="text-2xl font-bold px-4 sm:px-6 pt-6 pb-2">Booking Summary</h1>
                <hr className="border-t border-gray-300 mx-4 sm:mx-6 mt-2" />
                <h2 className="text-lg font-semibold px-4 sm:px-6 pt-6 pb-2">Personal Summary</h2>

                <PassengerInfo
                    name="Mr. James Smith"
                    email="james.smith@gmail.com"
                    phone="+61 123456789"
                    passport="C0123456"
                    departure={{
                        seat: "6F",
                        meal: "Standard meal",
                        baggage: "1 Standard",
                    }}
                    return={{
                        seat: "5C",
                        meal: "Premium meal",
                        baggage: "1 Standard, 1 Oversized",
                    }}
                />

                <div className="space-y-6 pb-6">
                    <BookingSummary data={data} />
                </div>

                <div className="flex justify-between px-4 sm:px-6 pb-6 text-base font-semibold">
                    <span className="ml-6">Total:</span>
                    <span className="text-blue-700 mr-2">${total}</span>
                </div>
            </div>

            <div className="mt-4 mb-4 ml-44">
                <ProceedButton />
            </div>
        </div>
    );
}

