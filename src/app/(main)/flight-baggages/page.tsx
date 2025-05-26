'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import FlightSummaryHeader from '../components/FlightSummaryHeader';
import BaggageSelector from './components/BaggageSelector';
import BaggageInfo from './components/BaggageInfo';
import { useBookingStore } from 'src/store/bookingStore';
import { useBaggageTypeStore } from 'src/store/baggageTypeStore'; // if separated

function FlightBaggage() {
    const router = useRouter();

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

    const { totalStandard, totalOversized, totalPrice } = getTotalBaggageCount();

    return (
        <main className="flex flex-col w-full px-4 sm:px-6 lg:px-8 pt-20">
            <FlightSummaryHeader
                departureCode={itinerary.outbound?.departureAirport.code ?? 'SYD'}
                destinationCode={itinerary.outbound?.arrivalAirport.code ?? 'MEL'}
                departureDate={
                    itinerary.outbound
                        ? new Date(itinerary.outbound.departureTime).toDateString()
                        : ''
                }
                returnDate={
                    itinerary.return
                        ? new Date(itinerary.return.departureTime).toDateString()
                        : ''
                }
                passengers={passengers.length}
                flightClass="Economy"
            />

            <div className="max-w-4xl w-full mx-auto bg-white p-10 pt-5 shadow-lg text-left">
                <div className="mb-6">
                    <p className="text-2xl font-bold mb-2">Select Your Baggage</p>
                    <BaggageInfo />
                </div>

                <BaggageSelector />

                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100 flex flex-col gap-4 justify-between">
                    <p className="text-xl font-semibold text-black text-left">
                        Baggage Total: {totalStandard} Standard, {totalOversized} Oversized
                        <br />
                        <span className="text-blue-800">Total: ${totalPrice}</span>
                    </p>

                    <div className="flex gap-4 justify-end">
                        <button
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            onClick={() => router.back()}
                        >
                            Back to Seat
                        </button>
                        <button
                            onClick={() => router.push('/flight-meal')}
                            className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
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
