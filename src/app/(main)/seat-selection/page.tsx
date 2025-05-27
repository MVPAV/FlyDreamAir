import SeatSelection from "src/app/(main)/seat-selection/components/SeatSelection";
import React from "react";
import CurrentFlightHeader from "src/app/(main)/components/CurrentFlightHeader";

export default function SeatSelectionPage() {
    return (
        <div className="pt-20">
            <CurrentFlightHeader/>
            <SeatSelection/>
        </div>
    );
}
