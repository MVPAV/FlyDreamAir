'use client';

import React from 'react';
import { useBookingStore } from 'src/store/bookingStore';

interface FlightTabsProps {
    activeTab: 'outbound' | 'return';
    setActiveTab: (tab: 'outbound' | 'return') => void;
}

const FlightTabs: React.FC<FlightTabsProps> = ({ activeTab, setActiveTab }) => {
    const {
        currentBooking: { itinerary },
    } = useBookingStore();

    const departureCode = itinerary.outbound?.departureAirport.code ?? '---';
    const destinationCode = itinerary.outbound?.arrivalAirport.code ?? '---';

    return (
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-full max-w-md mx-auto sm:max-w-lg">
            <button
                onClick={() => setActiveTab('outbound')}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center rounded-md transition-colors text-sm sm:text-base ${
                    activeTab === 'outbound'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                }`}
            >
        <span className="block sm:hidden">
          {departureCode}→{destinationCode}
        </span>
                <span className="hidden sm:block">
          {departureCode} - {destinationCode}
        </span>
            </button>
            <button
                onClick={() => setActiveTab('return')}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center rounded-md transition-colors text-sm sm:text-base ${
                    activeTab === 'return'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                }`}
            >
        <span className="block sm:hidden">
          {destinationCode}→{departureCode}
        </span>
                <span className="hidden sm:block">
          {destinationCode} - {departureCode}
        </span>
            </button>
        </div>
    );
};

export default FlightTabs;
