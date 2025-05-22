"use client";
import React from "react";
import PassengerBaggageOptions from "./PassengerBaggageOptions";
import { FlightInformation } from "./FlightInformation";
import { PassengerIndicator } from "./PassengerIndicator";

interface BaggageSelectorProps {
  onTotalChange: (total: number) => void;
}

const BaggageSelector: React.FC<BaggageSelectorProps> = ({ onTotalChange }) => {
  const [totalPassengers, setTotalPassengers] = React.useState(2);
  const [currentPassenger, setCurrentPassenger] = React.useState(0);
  const [passengerBaggage, setPassengerBaggage] = React.useState(() => {
    // Initialize with 2 passengers by default
    return Array(totalPassengers).fill(null).map(() => ({
      outbound: { standardCount: 0, oversizedCount: 0 },
      return: { standardCount: 0, oversizedCount: 0 }
    }));
  });

  // Function to handle passenger count change
  const handlePassengerCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCount = parseInt(e.target.value);
    
    // Update passenger array while preserving existing data
    setPassengerBaggage(prevBaggage => {
      const newBaggage = Array(newCount).fill(null).map((_, index) => {
        // Preserve existing passenger data or create new
        if (index < prevBaggage.length) {
          return prevBaggage[index];
        } else {
          return {
            outbound: { standardCount: 0, oversizedCount: 0 },
            return: { standardCount: 0, oversizedCount: 0 }
          };
        }
      });
      return newBaggage;
    });
    
    setTotalPassengers(newCount);
    
    // Make sure current passenger selection is still valid
    if (currentPassenger >= newCount) {
      setCurrentPassenger(newCount - 1);
    }
    
    // Recalculate total cost
    updateTotalCost();
  };

  // Function to select a passenger
  const handleSelectPassenger = (index: number) => {
    setCurrentPassenger(index);
  };

  // Function to handle baggage changes
  const handleBaggageChange = (flightType: 'outbound' | 'return', standardCount: number, oversizedCount: number) => {
    setPassengerBaggage(prevBaggage => {
      const newBaggage = [...prevBaggage];
      newBaggage[currentPassenger] = {
        ...newBaggage[currentPassenger],
        [flightType]: { standardCount, oversizedCount }
      };
      return newBaggage;
    });

    updateTotalCost();
  };

  // Calculate and update total cost
  const updateTotalCost = () => {
    const standardPrice = 30;
    const oversizedPrice = 50;

    const total = passengerBaggage.reduce((sum, passenger) => {
      const outboundCost = (passenger.outbound.standardCount * standardPrice) + 
                         (passenger.outbound.oversizedCount * oversizedPrice);
      const returnCost = (passenger.return.standardCount * standardPrice) + 
                        (passenger.return.oversizedCount * oversizedPrice);
      return sum + outboundCost + returnCost;
    }, 0);

    onTotalChange(total);
  };

  // Sync the total cost when component mounts
  React.useEffect(() => {
    updateTotalCost();
  }, [passengerBaggage]);

  return (
    <section className="w-full mt-4">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
        </div>
      </div>

      <PassengerIndicator
        currentPassenger={currentPassenger}
        totalPassengers={totalPassengers}
        onSelectPassenger={handleSelectPassenger}
      />

      <div className="border-flydream-primary pl-2 py-2 mb-6">
        <h3 className="text-xl font-medium">
          Selecting baggage for: Passenger {currentPassenger + 1} 
        </h3>
      </div>

      <div className="mb-8">
        <FlightInformation
          departureAirport="Sydney"
          destinationAirport="Melbourne"
        />
        <PassengerBaggageOptions
          passengerIndex={currentPassenger}
          onBaggageChange={(_, standard, oversized) => 
            handleBaggageChange('outbound', standard, oversized)}
          initialStandardCount={passengerBaggage[currentPassenger].outbound.standardCount}
          initialOversizedCount={passengerBaggage[currentPassenger].outbound.oversizedCount}
        />
      </div>

      <div className="mt-10">
        <FlightInformation
          departureAirport="Melbourne"
          destinationAirport="Sydney"
        />
        <PassengerBaggageOptions
          passengerIndex={currentPassenger}
          onBaggageChange={(_, standard, oversized) => 
            handleBaggageChange('return', standard, oversized)}
          initialStandardCount={passengerBaggage[currentPassenger].return.standardCount}
          initialOversizedCount={passengerBaggage[currentPassenger].return.oversizedCount}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold">Baggage Summary</h3>
        <div className="mt-2 space-y-1">
          {passengerBaggage.map((passenger, index) => (
            <div key={index} className="flex justify-between text-base">
              <span>Passenger {index + 1}:</span>
              <span>
                {passenger.outbound.standardCount + passenger.return.standardCount} standard, <span> </span>
                {passenger.outbound.oversizedCount + passenger.return.oversizedCount} oversized
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BaggageSelector;