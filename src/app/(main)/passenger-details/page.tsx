'use client'

import React from "react";
import PassengerForm from "src/app/(main)/passenger-details/components/PassengerForm";
import CurrentFlightHeader from "src/app/(main)/components/CurrentFlightHeader";

export default function PassengerDetails() {
    return (
        <div className="pt-20">
            <CurrentFlightHeader/>
            <PassengerForm/>
        </div>
    );
}

