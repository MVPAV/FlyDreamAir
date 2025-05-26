'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useBookingStore} from 'src/store/bookingStore';
import {useMealTypeStore} from 'src/store/mealTypeStore';
import {User} from "lucide-react";
import CurrentFlightHeader from "src/app/(main)/components/CurrentFlightHeader";
import FlightTabs from 'src/app/(main)/components/FlightTabs';

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
        <div className="mt-20 flex flex-col min-h-screen">
            <CurrentFlightHeader/>

            {itinerary.return && (
                <div className="mt-6">
                    <FlightTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            )}

            <main className="flex-1 bg-gray-50">
                <div className="max-w-5xl container mx-auto px-4 py-6">
                    {passengers.map((p, index) => {
                        const segmentId = getSegmentId();
                        if (!segmentId) return null;

                        return (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-1">Meals for Passenger {index + 1}</h2>
                                <p className="text-gray-600 text-sm mb-4">Standard meal is included.</p>

                                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-900 text-white rounded-full p-2">
                                            <User className="h-4 w-4"/>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">{p.firstName}</span>
                                            <div className="text-lg font-semibold text-gray-900">{p.lastName}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mealTypes.map((meal) => (
                                        <div
                                            key={meal.id}
                                            onClick={() => handleToggleMeal(index, segmentId, meal.id)}
                                            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">{meal.description}</p>
                                                </div>
                                                <div className="text-right ml-4">
                                                    {meal.price == 0 ? (
                                                        <span className="text-green-600 font-medium">Included</span>
                                                    ) : (
                                                        <span
                                                            className="text-blue-900 font-semibold">{meal.price}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected(index, segmentId, meal.id)}
                                                    onChange={() => {}}
                                                    className="h-4 w-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label className="ml-2 text-sm text-gray-700 cursor-pointer">
                                                    Select
                                                </label>
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
                                Continue to Review
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
