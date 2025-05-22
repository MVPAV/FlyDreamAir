import React from "react";

type PassengerIndicatorProps = {
  currentPassenger: number;
  totalPassengers: number;
  onSelectPassenger: (index: number) => void;
};

export const PassengerIndicator = ({
  currentPassenger,
  totalPassengers,
  onSelectPassenger,
}: PassengerIndicatorProps) => {
  return (
    <div className="mb-6">
      <h3 className="relative mt-10 text-xl font-semibold text-black max-md:mt-10 max-md:ml-1.5 ">
        Add checked baggage
      </h3>
      <select
        value={currentPassenger}
        onChange={(e) => onSelectPassenger(parseInt(e.target.value))}
        className="w-full mt-5 max-w-xs p-3 border-1 rounded-lg text-base font-medium text-gray-800 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50 transition-colors duration-200"
      >
        {Array.from({ length: totalPassengers }).map((_, index) => (
          <option key={index} value={index}>
            Passenger {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};