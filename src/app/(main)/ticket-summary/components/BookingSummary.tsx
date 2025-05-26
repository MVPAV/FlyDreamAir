import SummarySection from "./SummarySection";
import { BookingSummaryData } from "src/app/(main)/ticket-summary/types";

export default function BookingSummary({ data }: { data: BookingSummaryData }) {
    return (
        <div className="pt-10 max-w-5xl w-full">
            <h2 className="text-lg font-semibold px-4 sm:px-6 text-blue-900">Booking Summary</h2>

            <div className="mx-4 sm:mx-6 mt-4 space-y-6">
                <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                    <SummarySection title="Fares" items={data.fares} />
                </div>
                <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                    <SummarySection title="Seats" items={data.seats} />
                </div>
                <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                    <SummarySection title="Baggage" items={data.baggage} />
                </div>
                <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                    <SummarySection title="Meal" items={data.meal} />
                </div>
            </div>
        </div>
    );
}
