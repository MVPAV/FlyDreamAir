"use client";
import * as React from "react";
import BaggageInfo from "./components/BaggageInfo";
import BaggageSelector from "./components/BaggageSelector";
import FlightSummaryHeader from "../components/FlightSummaryHeader";


function FlightBaggage() {
  const [baggageTotal, setBaggageTotal] = React.useState(0);

  return (
    <main className="flex overflow-hidden flex-col bg-white pt-20">
      <FlightSummaryHeader 
        departureCode="SYD"
        destinationCode="MEL"
        departureDate="22-04-2025"
        returnDate="27-04-2025"
        passengers={1}
        flightClass="Economy"
      />

      <div className="max-w-4xl mx-auto bg-white p-10 pt-5 border border-gray-200 shadow-lg text-left">
            <p className="text-2xl font-bold mb-2">Select Your Baggage </p>
            <BaggageInfo />
            <BaggageSelector onTotalChange={setBaggageTotal} />
            <p className="relative mt-30 -mb-2 text-xl font-semibold text-left text-black max-md:mt-10 max-md:mb-2.5 max-md:ml-2.5">
            Baggage total: ${baggageTotal}
            </p>
      </div>

    </main>
  );
}

export default FlightBaggage;