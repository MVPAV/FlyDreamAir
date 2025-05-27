'use client';
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
        <div className="flex items-center flex-wrap gap-5 sm:gap-7 text-black">
            {/* Decrement Button */}
            <button
                onClick={onDecrement}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-gray-300 border-opacity-30 hover:bg-blue-200 transition-colors duration-200 text-sm sm:text-xl"
                aria-label="Decrease baggage count"
            >
                –
            </button>

            {/* Count Display */}
            <span className="text-sm sm:text-xl font-medium">{count}</span>

            {/* Increment Button */}
            <button
                onClick={onIncrement}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-gray-300 border-opacity-30 hover:bg-blue-100 transition-colors duration-200 text-sm sm:text-xl"
                aria-label="Increase baggage count"
            >
                +
            </button>
        </div>
    );
};

export default BaggageCounter;
