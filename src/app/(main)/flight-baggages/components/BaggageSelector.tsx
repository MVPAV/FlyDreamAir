"use client";
import React from "react";
import PassengerBaggageOptions from "./PassengerBaggageOptions";
import { FlightInformation } from "./FlightInformation";

interface BaggageSelectorProps {
  onTotalChange: (total: number) => void;
}

const BaggageSelector: React.FC<BaggageSelectorProps> = ({ onTotalChange }) => {
  const [passengerBaggage, setPassengerBaggage] = React.useState([
    { standardCount: 0, oversizedCount: 0 },
    { standardCount: 0, oversizedCount: 0 }
  ]);

  const handleBaggageChange = (passengerIndex: number, standardCount: number, oversizedCount: number) => {
    const newPassengerBaggage = [...passengerBaggage];
    newPassengerBaggage[passengerIndex] = { standardCount, oversizedCount };
    setPassengerBaggage(newPassengerBaggage);

    // Calculate total cost
    const standardPrice = 30;
    const oversizedPrice = 50;

    const total = newPassengerBaggage.reduce((sum, passenger) => {
      return sum + (passenger.standardCount * standardPrice) + (passenger.oversizedCount * oversizedPrice);
    }, 0);

    onTotalChange(total);
  };

  return (
    <section className="w-full mt-4">
      <FlightInformation
        departureAirport="Sydney"
        destinationAirport="Melbourne"
      />
      <PassengerBaggageOptions
        passengerIndex={0}
        onBaggageChange={handleBaggageChange}
      />

      <div className="mt-10 max-md:mt-10">
      <FlightInformation
        departureAirport="Melbourne"
        destinationAirport="Sydney"
      />
        <PassengerBaggageOptions
          passengerIndex={1}
          onBaggageChange={handleBaggageChange}
        />
      </div>
    </section>
  );
};

export default BaggageSelector;