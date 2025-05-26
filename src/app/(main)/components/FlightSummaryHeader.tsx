import React from 'react';
import {ArrowLeft, ArrowRight} from 'lucide-react';

interface FlightSummaryHeaderProps {
    departureCode: string;
    destinationCode: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
    flightClass: string;
    tripType: string;
}

const FlightSummaryHeader: React.FC<FlightSummaryHeaderProps> = ({
                                                                     departureCode,
                                                                     destinationCode,
                                                                     departureDate,
                                                                     returnDate,
                                                                     passengers,
                                                                     flightClass,
                                                                     tripType
                                                                 }) => {
    return (
        <div className="w-full bg-gradient-to-br from-blue-50 to-white border-b border-gray-200 shadow-sm py-6">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Route summary */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8 text-center sm:text-left">
                    <h2 className="text-3xl font-extrabold text-blue-900 tracking-wide">
                        {departureCode} → {destinationCode}
                    </h2>
                    {tripType === 'return' && (
                        <>
                            <div className="flex items-center gap-1 text-blue-600">
                                <ArrowLeft className="h-5 w-5"/>
                                <ArrowRight className="h-5 w-5 -ml-2"/>
                            </div>
                            <h2 className="text-3xl font-extrabold text-blue-900 tracking-wide">
                                {destinationCode} → {departureCode}
                            </h2>
                        </>
                    )}
                </div>

                {/* Flight details */}
                <div
                    className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm sm:text-base text-gray-700">
                    <Detail label="From" value={departureCode}/>
                    <Detail label="To" value={destinationCode}/>
                    <Detail label="Depart" value={departureDate}/>
                    {returnDate && <Detail label="Return" value={returnDate}/>}
                    <Detail label="Passengers" value={passengers.toString()}/>
                    <Detail label="Class" value={flightClass}/>
                </div>
            </div>
        </div>
    );
};

const Detail = ({label, value}: { label: string; value: string }) => (
    <div className="flex-shrink-0">
        <span className="text-gray-500 font-medium">{label}:</span>{' '}
        <span className="text-gray-900 font-semibold">{value}</span>
    </div>
);

export default FlightSummaryHeader;
