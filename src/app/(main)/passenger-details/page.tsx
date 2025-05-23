import React from "react";
import PassengerForm from "src/app/(main)/passenger-details/components/PassengerForm";
import FlightSummaryHeader from "src/app/(main)/components/FlightSummaryHeader";

export default function passenger_details() {
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
            <PassengerForm/>
        </div>
    );
}

