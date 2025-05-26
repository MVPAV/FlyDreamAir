'use client';

import React from 'react';
import {useBookingStore} from 'src/store/bookingStore';
import {useBaggageTypeStore} from 'src/store/baggageTypeStore';
import {FlightInformation} from './FlightInformation';
import PassengerBaggageOptions from './PassengerBaggageOptions';

const BaggageSelector: React.FC = () => {
    const passengers = useBookingStore((s) => s.currentBooking.passengers);
    const outboundSegmentId = useBookingStore((s) => s.currentBooking.itinerary.outbound?.id);
    const returnSegmentId = useBookingStore((s) => s.currentBooking.itinerary.return?.id);
    const addBaggageItem = useBookingStore((s) => s.addBaggageItem);
    const removeBaggageItem = useBookingStore((s) => s.removeBaggageItem);

    const getTypeByName = useBaggageTypeStore((s) => s.getBaggageTypeByName);
    const standard = getTypeByName('Standard');
    const oversized = getTypeByName('Oversized');

    if (!standard || !oversized) {
        return <p className="text-center py-10 text-gray-500">Loading baggage types...</p>;
    }

    const countType = (pIndex: number, segmentId: string, typeId: string) =>
        passengers[pIndex].baggages.filter((b) => b.segmentId === segmentId && b.typeId === typeId).length;

    const updateItemsToMatchCount = (
        pIndex: number,
        segmentId: string,
        typeId: string,
        desired: number
    ) => {
        const current = countType(pIndex, segmentId, typeId);
        const delta = desired - current;
        if (delta > 0) {
            for (let i = 0; i < delta; i++) addBaggageItem(pIndex, segmentId, typeId);
        } else if (delta < 0) {
            for (let i = 0; i < -delta; i++) removeBaggageItem(pIndex, segmentId, typeId);
        }
    };

    const handleBaggageChange = (
        pIndex: number,
        segmentId: string,
        standardCount: number,
        oversizedCount: number
    ) => {
        updateItemsToMatchCount(pIndex, segmentId, standard.id, standardCount);
        updateItemsToMatchCount(pIndex, segmentId, oversized.id, oversizedCount);
    };

    const getPassengerTotal = (pIndex: number) => {
        let total = 0;
        if (outboundSegmentId) {
            total += countType(pIndex, outboundSegmentId, standard.id) * standard.price;
            total += countType(pIndex, outboundSegmentId, oversized.id) * oversized.price;
        }
        if (returnSegmentId) {
            total += countType(pIndex, returnSegmentId, standard.id) * standard.price;
            total += countType(pIndex, returnSegmentId, oversized.id) * oversized.price;
        }
        return total;
    };

    const getAllTotal = () =>
        passengers.reduce((sum, _, i) => sum + getPassengerTotal(i), 0);

    return (
        <section className="w-full mt-4">
            <div className="border-flydream-primary py-2 mb-6">
                <h3 className="text-xl font-medium">Select Baggage for Each Passenger</h3>
            </div>

            {passengers.map((passenger, index) => {
                const stdOutbound = outboundSegmentId ? countType(index, outboundSegmentId, standard.id) : 0;
                const ovOutbound = outboundSegmentId ? countType(index, outboundSegmentId, oversized.id) : 0;
                const stdReturn = returnSegmentId ? countType(index, returnSegmentId, standard.id) : 0;
                const ovReturn = returnSegmentId ? countType(index, returnSegmentId, oversized.id) : 0;

                return (
                    <div key={index} className="mb-4">
                        <h4 className="text-lg font-semibold mb-4">
                            Passenger {index + 1}: {passenger.firstName} {passenger.lastName}
                        </h4>

                        {outboundSegmentId && (
                            <>
                                <FlightInformation departureAirport="Sydney" destinationAirport="Melbourne"/>
                                <PassengerBaggageOptions
                                    passengerIndex={index}
                                    initialStandardCount={stdOutbound}
                                    initialOversizedCount={ovOutbound}
                                    onBaggageChange={(_, standard, oversized) =>
                                        handleBaggageChange(index, outboundSegmentId, standard, oversized)
                                    }
                                />
                            </>
                        )}

                        {returnSegmentId && (
                            <div className="mt-6">
                                <FlightInformation departureAirport="Melbourne" destinationAirport="Sydney"/>
                                <PassengerBaggageOptions
                                    passengerIndex={index}
                                    initialStandardCount={stdReturn}
                                    initialOversizedCount={ovReturn}
                                    onBaggageChange={(_, standard, oversized) =>
                                        handleBaggageChange(index, returnSegmentId, standard, oversized)
                                    }
                                />
                            </div>
                        )}

                        <div className="mt-4 text-base font-medium">
                            Summary: {stdOutbound + stdReturn} standard, {ovOutbound + ovReturn} oversized → Total:
                            ${getPassengerTotal(index)}
                        </div>
                    </div>
                );
            })}

            <div className="pt-6 border-t mt-4 text-lg font-semibold">
                <span>Total Baggage Cost: </span>
                <span className="text-blue-700">${getAllTotal()}</span>
            </div>
        </section>
    );
};

export default BaggageSelector;
