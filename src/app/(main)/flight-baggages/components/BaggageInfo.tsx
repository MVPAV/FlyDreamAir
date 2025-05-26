import React from "react";
import { FaSuitcase, FaDollyFlatbed } from "react-icons/fa";

const BaggageInfo = () => {
    return (
        <section className="w-full px-4 sm:px-6 py-6">
            {/* Carry-on info */}
            <h2 className="text-base sm:text-lg text-gray-700 mb-6 max-w-2xl">
                All passengers receive 1 carry-on bag (7kg) for free.
            </h2>

            {/* Additional checked baggage */}
            <p className="text-base sm:text-lg text-gray-700 mb-4 max-w-2xl">
                You can add additional checked baggage below:
            </p>

            {/* Standard Checked Bag */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 text-black">
                <FaSuitcase className="text-blue-800 text-3xl" />
                <p className="max-w-md text-sm sm:text-base">
                    <strong>Standard Checked Bag (23kg):</strong> $30 each
                </p>
            </div>

            {/* Oversized/Overweight Bag */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-black">
                <FaDollyFlatbed className="text-blue-800 text-3xl" />
                <p className="max-w-md text-sm sm:text-base">
                    <strong>Oversized/Overweight Bag (32kg):</strong> $50 each
                </p>
            </div>
        </section>
    );
};

export default BaggageInfo;
