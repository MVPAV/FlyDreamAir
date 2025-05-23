import SeatSelection from "src/app/(main)/seat-selection/components/SeatSelection";
import FlightSummaryHeader from "src/app/(main)/components/FlightSummaryHeader";
import React from "react";

export default function SeatSelectionPage() {
    return (
        <div className="pt-20">
            <FlightSummaryHeader
                departureCode="NYC"
                destinationCode="LAX"
                departureDate="2025-06-01"
                returnDate="2025-06-10"
                passengers={1}
                flightClass="Economy"
            />
            <SeatSelection/>
        </div>
    );
}
