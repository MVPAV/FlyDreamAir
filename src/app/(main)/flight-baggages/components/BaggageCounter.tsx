"use client";
import React from "react";

interface BaggageCounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const BaggageCounter: React.FC<BaggageCounterProps> = ({
  count,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="flex gap-7 text-xl text-black whitespace-nowrap">
      <button
        onClick={onDecrement}
        className="px-4 py-1.5 rounded-xl border border-solid border-gray-300 border-opacity-30 hover:bg-blue-300 transition-colors duration-200"
        aria-label="Decrease baggage count"
      >
        -
      </button>

      <span className="my-auto text-xl">{count}</span>

      <button
        onClick={onIncrement}
        className="px-3 py-1.5 rounded-xl border border-solid border-gray-300 border-opacity-30 hover:bg-blue-100 transition-colors duration-200"
        aria-label="Increase baggage count"
      >
        +
      </button>
    </div>
  );
};

export default BaggageCounter;