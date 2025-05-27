'use client';
import React from "react";
import { FaSuitcase, FaDollyFlatbed } from "react-icons/fa";
import BaggageCounter from "./BaggageCounter";

interface PassengerBaggageOptionsProps {
    passengerIndex: number;
    onBaggageChange: (passengerIndex: number, standardCount: number, oversizedCount: number) => void;
    initialStandardCount?: number;
    initialOversizedCount?: number;
}

const PassengerBaggageOptions: React.FC<PassengerBaggageOptionsProps> = ({
                                                                             passengerIndex,
                                                                             onBaggageChange,
                                                                             initialStandardCount = 0,
                                                                             initialOversizedCount = 0,
                                                                         }) => {
    const [standardCount, setStandardCount] = React.useState(initialStandardCount);
    const [oversizedCount, setOversizedCount] = React.useState(initialOversizedCount);

    React.useEffect(() => {
        setStandardCount(initialStandardCount);
        setOversizedCount(initialOversizedCount);
    }, [initialStandardCount, initialOversizedCount, passengerIndex]);

    const handleStandardIncrement = () => {
        if (standardCount < 3) {
            const newCount = standardCount + 1;
            setStandardCount(newCount);
            onBaggageChange(passengerIndex, newCount, oversizedCount);
        }
    };

    const handleStandardDecrement = () => {
        if (standardCount > 0) {
            const newCount = standardCount - 1;
            setStandardCount(newCount);
            onBaggageChange(passengerIndex, newCount, oversizedCount);
        }
    };

    const handleOversizedIncrement = () => {
        if (oversizedCount < 2) {
            const newCount = oversizedCount + 1;
            setOversizedCount(newCount);
            onBaggageChange(passengerIndex, standardCount, newCount);
        }
    };

    const handleOversizedDecrement = () => {
        if (oversizedCount > 0) {
            const newCount = oversizedCount - 1;
            setOversizedCount(newCount);
            onBaggageChange(passengerIndex, standardCount, newCount);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Standard Baggage */}
            <article className="flex flex-col gap-4 w-full rounded-2xl border border-gray-300 px-4 sm:px-5 py-4 shadow-sm bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <FaSuitcase className="text-blue-800 text-2xl sm:text-3xl" />
                    <h4 className="text-base sm:text-lg font-semibold text-black leading-snug break-words">
                        Standard Checked Bag (23kg – max 3 bags)
                    </h4>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <p className="text-sm sm:text-base text-gray-600 sm:max-w-lg">
                        Add standard checked bags for this passenger.
                    </p>
                    <BaggageCounter
                        count={standardCount}
                        onIncrement={handleStandardIncrement}
                        onDecrement={handleStandardDecrement}
                    />
                </div>
            </article>

            {/* Oversized Baggage */}
            <article className="flex flex-col gap-4 w-full rounded-2xl border border-gray-300 px-5 py-4 shadow-sm bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <FaDollyFlatbed className="text-blue-800 text-2xl sm:text-3xl" />
                    <h4 className="text-base sm:text-lg font-semibold text-black leading-snug break-words">
                        Oversized/Overweight Bag (32kg – max 2 bags)
                    </h4>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <p className="text-sm sm:text-base text-gray-600 sm:max-w-lg">
                        Add oversized or overweight bags for this passenger.
                    </p>
                    <BaggageCounter
                        count={oversizedCount}
                        onIncrement={handleOversizedIncrement}
                        onDecrement={handleOversizedDecrement}
                    />
                </div>
            </article>
        </div>
    );
};

export default PassengerBaggageOptions;
