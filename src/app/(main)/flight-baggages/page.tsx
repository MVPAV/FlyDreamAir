'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import FlightSummaryHeader from '../components/FlightSummaryHeader';
import BaggageSelector from './components/BaggageSelector';
import BaggageInfo from './components/BaggageInfo';
import {useBookingStore} from 'src/store/bookingStore';
import {useBaggageTypeStore} from 'src/store/baggageTypeStore';
import CurrentFlightHeader from "src/app/(main)/components/CurrentFlightHeader";
import FlightTabs from 'src/app/(main)/components/FlightTabs';
import {useState} from "react";

function FlightBaggage() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'outbound' | 'return'>('outbound');

    const passengers = useBookingStore((s) => s.currentBooking.passengers);
    const itinerary = useBookingStore((s) => s.currentBooking.itinerary);
    const getBaggageTypeByName = useBaggageTypeStore((s) => s.getBaggageTypeByName);

    const outboundSegmentId = itinerary.outbound?.id;
    const returnSegmentId = itinerary.return?.id;

    const standardType = getBaggageTypeByName('Standard');
    const oversizedType = getBaggageTypeByName('Oversized');

    if (!standardType || !oversizedType) {
        return <p className="p-10 text-center text-gray-500">Loading baggage types...</p>;
    }

    const getTotalBaggageCount = () => {
        let totalStandard = 0;
        let totalOversized = 0;

        passengers.forEach((p) => {
            [outboundSegmentId, returnSegmentId].forEach((segmentId) => {
                if (!segmentId) return;
                totalStandard += p.baggages.filter(
                    (b) => b.segmentId === segmentId && b.typeId === standardType.id
                ).length;
                totalOversized += p.baggages.filter(
                    (b) => b.segmentId === segmentId && b.typeId === oversizedType.id
                ).length;
            });
        });

        return {
            totalStandard,
            totalOversized,
            totalPrice:
                totalStandard * standardType.price + totalOversized * oversizedType.price,
        };
    };

    const {totalStandard, totalOversized, totalPrice} = getTotalBaggageCount();

    return (
        <main className="flex flex-col w-full px-4 sm:px-6 lg:px-8 pt-20">
            <CurrentFlightHeader/>

            <div className="max-w-4xl w-full mx-auto bg-white p-10 pt-5 shadow-lg text-left mt-8">
                <div className="mb-6">
                    <p className="text-2xl font-bold mb-2">Select Your Baggage</p>
                    <BaggageInfo/>
                </div>

                {itinerary.return && (
                    <FlightTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                )}

                <BaggageSelector activeTab={activeTab}/>

                <div className="mt-8 flex flex-col">
                    <p className="text-base sm:text-xl font-semibold text-black text-center sm:text-left leading-relaxed">
                        Baggage Total: {totalStandard} Standard, {totalOversized} Oversized
                        <br/>
                        <span className="text-blue-800">Total: ${totalPrice}</span>
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-end">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto bg-white border border-gray-300 px-6 py-3 rounded-md shadow hover:bg-gray-100"
                        >
                            Back to Seat Selection
                        </button>
                        <button
                            onClick={() => router.push('/flight-meal')}
                            className="w-full sm:w-auto bg-blue-700 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800"
                        >
                            Continue to Food Selections
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default FlightBaggage;
