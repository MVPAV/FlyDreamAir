'use client';

import React from 'react';
import {useBookingStore} from 'src/store/bookingStore';
import {useBaggageTypeStore} from 'src/store/baggageTypeStore';
import {FlightInformation} from './FlightInformation';
import PassengerBaggageOptions from './PassengerBaggageOptions';

const BaggageSelector: React.FC<{ activeTab: 'outbound' | 'return' }> = ({activeTab}) => {
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
                const showOutbound = activeTab === 'outbound' && outboundSegmentId;
                const showReturn = activeTab === 'return' && returnSegmentId;

                const stdOutbound = countType(index, outboundSegmentId!, standard.id);
                const ovOutbound = countType(index, outboundSegmentId!, oversized.id);
                const stdReturn = countType(index, returnSegmentId!, standard.id);
                const ovReturn = countType(index, returnSegmentId!, oversized.id);

                return (
                    <div key={index} className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h4 className="text-lg font-semibold mb-4">
                            Passenger {index + 1}: {passenger.firstName} {passenger.lastName}
                        </h4>

                        {showOutbound && (
                            <>
                                <PassengerBaggageOptions
                                    passengerIndex={index}
                                    initialStandardCount={stdOutbound}
                                    initialOversizedCount={ovOutbound}
                                    onBaggageChange={(_, standard, oversized) =>
                                        handleBaggageChange(index, outboundSegmentId!, standard, oversized)
                                    }
                                />
                            </>
                        )}

                        {showReturn && (
                            <>
                                <PassengerBaggageOptions
                                    passengerIndex={index}
                                    initialStandardCount={stdReturn}
                                    initialOversizedCount={ovReturn}
                                    onBaggageChange={(_, standard, oversized) =>
                                        handleBaggageChange(index, returnSegmentId!, standard, oversized)
                                    }
                                />
                            </>
                        )}

                        <div className="mt-6 space-y-3 text-sm sm:text-base text-gray-800">
                            {/* Outbound */}
                            {(stdOutbound > 0 || ovOutbound > 0) && (
                                <div className="bg-blue-50 border border-blue-100 rounded-md p-3 shadow-sm">
                                    <p className="font-semibold text-blue-900 mb-1">Outbound Segment</p>
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        {stdOutbound > 0 && (
                                            <span
                                                className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-medium">
            {stdOutbound} Standard
          </span>
                                        )}
                                        {ovOutbound > 0 && (
                                            <span
                                                className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full font-medium">
            {ovOutbound} Oversized
          </span>
                                        )}
                                        <span className="ml-auto font-semibold">
          Subtotal: ${stdOutbound * standard.price + ovOutbound * oversized.price}
        </span>
                                    </div>
                                </div>
                            )}

                            {/* Return */}
                            {(stdReturn > 0 || ovReturn > 0) && (
                                <div className="bg-green-50 border border-green-100 rounded-md p-3 shadow-sm">
                                    <p className="font-semibold text-green-900 mb-1">Return Segment</p>
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        {stdReturn > 0 && (
                                            <span
                                                className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-medium">
            {stdReturn} Standard
          </span>
                                        )}
                                        {ovReturn > 0 && (
                                            <span
                                                className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full font-medium">
            {ovReturn} Oversized
          </span>
                                        )}
                                        <span className="ml-auto font-semibold">
          Subtotal: ${stdReturn * standard.price + ovReturn * oversized.price}
        </span>
                                    </div>
                                </div>
                            )}

                            {/* Combined total */}
                            <div className="text-right text-base sm:text-lg font-bold text-blue-800 mt-2">
                                Total for Passenger: ${getPassengerTotal(index)}
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="pt-6 mt-4 text-lg font-semibold">
                <span>Total Baggage Cost: </span>
                <span className="text-blue-700">${getAllTotal()}</span>
            </div>
        </section>
    );
};

export default BaggageSelector;
