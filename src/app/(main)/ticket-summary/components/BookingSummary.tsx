import SummarySection from "./SummarySection";
import { BookingSummaryData } from "src/app/(main)/ticket-summary/types";

export default function BookingSummary({ data }: { data: BookingSummaryData }) {
    return (
        <div className="pt-10 max-w-5xl">
            <h2 className="text-lg font-semibold px-4 sm:px-6">Booking Summary</h2>

            <div className="divide-y divide-black mx-4 sm:mx-6 mt-4">
                <div><SummarySection title="Fares" items={data.fares} /></div>
                <div><SummarySection title="Seats" items={data.seats} /></div>
                <div><SummarySection title="Baggage" items={data.baggage} /></div>
                <div><SummarySection title="Meal" items={data.meal} /></div>
            </div>
        </div>
    );
}
