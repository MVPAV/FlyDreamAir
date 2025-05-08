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
        <div className="mb-6">
          <p className="text-2xl font-bold mb-2">Select Your Baggage</p>
          <BaggageInfo />
        </div>

        <BaggageSelector onTotalChange={setBaggageTotal} />

        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100 flex flex-col gap-4 justify-between">
          <p className="text-xl font-semibold text-black text-left">
            Baggage total: ${baggageTotal}
          </p>
          <div className="flex gap-4 justify-end">
            <button 
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back to Seat
            </button>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors"
            >
              Continue to Food Selections
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FlightBaggage;