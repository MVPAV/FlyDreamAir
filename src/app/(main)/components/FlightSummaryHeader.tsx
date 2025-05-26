import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FlightSummaryHeaderProps {
  departureCode: string;
  destinationCode: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  flightClass: string;
}

const FlightSummaryHeader: React.FC<FlightSummaryHeaderProps> = ({
  departureCode,
  destinationCode,
  departureDate,
  returnDate,
  passengers,
  flightClass
}) => {
  return (
    <div className="w-full py-8 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl py-6">
        <div className="flex flex-col space-y-5">
          {/* Route information */}
          <div className="flex items-center justify-start space-x-4 md:space-x-8">
            <h2 className="text-2xl font-bold">
              {departureCode} - {destinationCode}
            </h2>
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-gray-500" />
              <ArrowRight className="h-5 w-5 text-gray-500 -ml-2" />
            </div>
            <h2 className="text-2xl font-bold">
              {destinationCode} - {departureCode}
            </h2>
          </div>

          {/* Flight details */}
          <div className="flex flex-wrap gap-y-2 items-center text-base text-gray-700">
            <div className="mr-5">
              <span className="font-semibold text-black">From:</span> {departureCode}
            </div>
            <div className="mr-5">
              <span className="font-semibold text-black">To:</span> {destinationCode}
            </div>
            <div className="mr-5">
              <span className="font-semibold text-black">Depart:</span> {departureDate}
            </div>
            {returnDate &&
            <div className="mr-5">
              <span className="font-semibold text-black">Return:</span> {returnDate}
            </div>
            }
            <div className="mr-5">
              <span className="font-semibold text-black">Passengers:</span> {passengers}
            </div>
            <div>
              <span className="font-semibold text-black">Class:</span> {flightClass}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSummaryHeader;
