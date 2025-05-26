'use client';

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from 'src/store/bookingStore';
import { useMealTypeStore } from 'src/store/mealTypeStore'; // assuming you're caching this

export default function MealSelection() {
    const router = useRouter();

    const passengers = useBookingStore((s) => s.currentBooking.passengers);
    const itinerary = useBookingStore((s) => s.currentBooking.itinerary);
    const addMealItem = useBookingStore((s) => s.addMealItem);
    const removeMealItem = useBookingStore((s) => s.removeMealItem);
    const clearMealsForSegment = useBookingStore((s) => s.clearMealsForSegment);

    const mealTypes = useMealTypeStore((s) => s.mealTypes); // preloaded from DB
    const getTypeByName = useMealTypeStore((s) => s.getMealTypeByName);

    const [activeTab, setActiveTab] = useState<'outbound' | 'return'>('outbound');

    const outboundSegmentId = itinerary.outbound?.id;
    const returnSegmentId = itinerary.return?.id;
    const getSegmentId = () => (activeTab === 'outbound' ? outboundSegmentId : returnSegmentId);
    const standardId = getTypeByName('Standard')?.id ?? '';

    useEffect(() => {
        if (!standardId || !outboundSegmentId) return;

        passengers.forEach((p, index) => {
            const outboundSelected = p.meals.some((m) => m.segmentId === outboundSegmentId);
            if (!outboundSelected) {
                addMealItem(index, outboundSegmentId, standardId);
            }

            if (returnSegmentId) {
                const returnSelected = p.meals.some((m) => m.segmentId === returnSegmentId);
                if (!returnSelected) {
                    addMealItem(index, returnSegmentId, standardId);
                }
            }
        });
    }, [passengers, standardId, outboundSegmentId, returnSegmentId, addMealItem]);

    if (!outboundSegmentId || !mealTypes.length) {
        return <div className="p-10 text-gray-500 text-center">Loading meal options...</div>;
    }

    const isSelected = (pIndex: number, segmentId: string, typeId: string) =>
        passengers[pIndex]?.meals.some((m) => m.segmentId === segmentId && m.typeId === typeId);

    const handleToggleMeal = (pIndex: number, segmentId: string, typeId: string) => {
        const isStandard = typeId === standardId;
        const isChecked = isSelected(pIndex, segmentId, typeId);

        if (isStandard) {
            clearMealsForSegment(pIndex, segmentId);
            addMealItem(pIndex, segmentId, typeId);
        } else {
            if (isChecked) {
                removeMealItem(pIndex, segmentId, typeId);

                const remainingMeals = passengers[pIndex].meals.filter(
                    (m) => m.segmentId === segmentId && m.typeId !== typeId
                );

                if (remainingMeals.length === 0) {
                    addMealItem(pIndex, segmentId, standardId);
                }
            } else {
                removeMealItem(pIndex, segmentId, standardId);
                addMealItem(pIndex, segmentId, typeId);
            }
        }
    };


    const getTotal = () => {
        return passengers.reduce((sum, p) => {
            return (
                sum +
                p.meals.reduce((sub, m) => {
                    const mt = mealTypes.find((mt) => mt.id === m.typeId);
                    return sub + (mt?.price ?? 0);
                }, 0)
            );
        }, 0);
    };

    const handleContinue = () => router.push('/ticket-summary');

    return (
        <div className="mt-24 flex flex-col min-h-screen">
            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="text-lg font-semibold mb-2">Meal Selection</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                            <div>From: {itinerary.outbound?.departureAirport.code}</div>
                            <div>To: {itinerary.outbound?.arrivalAirport.code}</div>
                            <div>Passengers: {passengers.length}</div>
                            <div>Class: Economy</div>
                        </div>
                    </div>

                    {returnSegmentId && (
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <button
                                className={`py-2 text-center rounded-md ${activeTab === 'outbound' ? 'bg-gray-300' : 'bg-gray-100'}`}
                                onClick={() => setActiveTab('outbound')}
                            >
                                Outbound
                            </button>
                            <button
                                className={`py-2 text-center rounded-md ${activeTab === 'return' ? 'bg-gray-300' : 'bg-gray-100'}`}
                                onClick={() => setActiveTab('return')}
                            >
                                Return
                            </button>
                        </div>
                    )}

                    {passengers.map((p, index) => {
                        const segmentId = getSegmentId();
                        if (!segmentId) return null;

                        return (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-1">Meals for Passenger {index + 1}</h2>
                                <p className="text-gray-600 text-sm mb-4">Standard meal is included.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mealTypes.map((meal) => (
                                        <div key={meal.id}>
                                            <h3 className="font-semibold mb-1">{meal.name}</h3>
                                            <div className="border border-gray-200 rounded-md p-4 mb-4">
                                                <div className="flex justify-between items-center">
                                                    <div>{meal.description}</div>
                                                    <div className="flex items-center">
                                                        {meal.price > 0 && (
                                                            <span className="text-gray-700 mr-2">+${meal.price}</span>
                                                        )}
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected(index, segmentId, meal.id)}
                                                            onChange={() => handleToggleMeal(index, segmentId, meal.id)}
                                                            className="h-4 w-4 text-blue-600 rounded"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                        <div>
                            <span className="font-semibold">Meal Total: </span>
                            <span className="font-bold">${getTotal()}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                                onClick={() => router.back()}
                            >
                                Back to Baggage
                            </button>
                            <button
                                onClick={handleContinue}
                                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
