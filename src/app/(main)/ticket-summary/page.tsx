'use client';

import FlightSummaryHeader from 'src/app/(main)/components/FlightSummaryHeader';
import PassengerInfo from 'src/app/(main)/ticket-summary/components/PassengerInfo';
import BookingSummary from 'src/app/(main)/ticket-summary/components/BookingSummary';
import {useBookingStore} from 'src/store/bookingStore';
import {useBaggageTypeStore} from 'src/store/baggageTypeStore';
import {useMealTypeStore} from 'src/store/mealTypeStore';
import {useSeatStore} from "src/store/seatStore";
import {useRouter} from "next/navigation";

export default function TicketSummary() {
    const router = useRouter();
    const {currentBooking} = useBookingStore();
    const passengers = currentBooking.passengers;
    const itinerary = currentBooking.itinerary;

    const getBaggageType = useBaggageTypeStore((s) => s.getBaggageTypeById);
    const getMealType = useMealTypeStore((s) => s.getMealTypeById);
    const getSeatNumberById = useSeatStore((s) => s.getSeatNumberById);
    const getSeatById = useSeatStore((s) => s.getSeatById);

    const buildPassengerDetails = (pIndex: number) => {
        const passenger = passengers[pIndex];

        const getSegmentInfo = (segmentId?: string) => {
            const baggageItems = passenger.baggages.filter(b => b.segmentId === segmentId);
            const mealItems = passenger.meals.filter(m => m.segmentId === segmentId);
            const seatId = passenger.tickets.find(t => t.segmentId === segmentId)?.seatId ?? '–';
            const seat = seatId ? getSeatNumberById(seatId) ?? '–' : '–';

            const baggageLabels = baggageItems.map(b => getBaggageType(b.typeId)?.name || 'Baggage');
            const baggageTotal = baggageItems.reduce((sum, b) => sum + (getBaggageType(b.typeId)?.price ?? 0), 0);

            const seatPrice = seatId ? getSeatById(seatId)?.price ?? 0 : 0;

            const mealLabels = mealItems.map(m => getMealType(m.typeId)?.name || 'Meal');
            const mealPrice = mealItems.reduce((sum, m) => sum + (getMealType(m.typeId)?.price ?? 0), 0);

            return {
                seat,
                seatPrice,
                meal: mealLabels.join(', '),
                mealPrice,
                baggageLabel: baggageLabels.join(', '),
                baggagePrice: baggageTotal,
            };
        };

        const outbound = getSegmentInfo(itinerary.outbound?.id);
        const returnTrip = getSegmentInfo(itinerary.return?.id);

        return {
            label: `Passenger ${pIndex + 1}`,
            personal: {
                name: `${passenger.title} ${passenger.firstName} ${passenger.lastName}`,
                email: passenger.email,
                phone: passenger.phone,
                passport: passenger.passport,
            },
            segments: {
                outbound,
                return: returnTrip,
            },
        };
    };

    const bookingData = {
        fares: passengers.map((_, i) => {
            const outboundFare = itinerary.outbound?.fares.find(
                (f) => f.fareClass === currentBooking.flightClass
            );
            const returnFare = itinerary.return?.fares.find(
                (f) => f.fareClass === currentBooking.flightClass
            );

            const formatFareClass = (fareClass: string) =>
                fareClass.charAt(0).toUpperCase() + fareClass.slice(1).toLowerCase();

            const details = [];

            if (outboundFare) {
                details.push({
                    route: 'Outbound',
                    value: formatFareClass(outboundFare.fareClass),
                    price: outboundFare.price,
                });
            }

            if (itinerary.return && returnFare) {
                details.push({
                    route: 'Return',
                    value: formatFareClass(returnFare.fareClass),
                    price: returnFare.price,
                });
            }

            return {
                label: `Passenger ${i + 1}`,
                details,
            };
        }),

        seats: passengers.map((_, i) => {
            const p = buildPassengerDetails(i);
            const details = [
                {route: 'Outbound', value: p.segments.outbound.seat, price: p.segments.outbound.seatPrice},
            ];
            if (itinerary.return) {
                details.push({route: 'Return', value: p.segments.return.seat, price: p.segments.return.seatPrice});
            }
            return {
                label: p.label,
                details,
            };
        }),

        baggage: passengers.map((_, i) => {
            const p = buildPassengerDetails(i);
            const details = [
                {route: 'Outbound', value: p.segments.outbound.baggageLabel, price: p.segments.outbound.baggagePrice},
            ];
            if (itinerary.return) {
                details.push({
                    route: 'Return',
                    value: p.segments.return.baggageLabel,
                    price: p.segments.return.baggagePrice
                });
            }
            return {
                label: p.label,
                details,
            };
        }),

        meal: passengers.map((_, i) => {
            const p = buildPassengerDetails(i);
            const details = [
                {route: 'Outbound', value: p.segments.outbound.meal, price: p.segments.outbound.mealPrice},
            ];
            if (itinerary.return) {
                details.push({route: 'Return', value: p.segments.return.meal, price: p.segments.return.mealPrice});
            }
            return {
                label: p.label,
                details,
            };
        }),
    };

    const total = Object.values(bookingData)
        .flatMap(section => section.flatMap(item => item.details.map(d => d.price || 0)))
        .reduce((sum, price) => sum + price, 0);

    return (
        <div className="pt-12">
            <FlightSummaryHeader
                departureCode={itinerary.outbound?.departureAirport.code ?? 'SYD'}
                destinationCode={itinerary.outbound?.arrivalAirport.code ?? 'MEL'}
                departureDate={itinerary.outbound?.departureTime.toString().slice(0, 10) ?? 'N/A'}
                returnDate={itinerary.return?.departureTime.toString().slice(0, 10) ?? 'N/A'}
                passengers={passengers.length}
                flightClass={currentBooking.flightClass}
            />

            <div className="max-w-4xl mx-auto border rounded-md shadow-sm bg-white -mt-6 px-4 sm:px-6">
                <h1 className="text-2xl font-bold pt-6 pb-2">Booking Summary</h1>
                <hr className="border-t border-gray-300 mt-2"/>

                <h2 className="text-lg font-semibold pt-6 pb-2">Passenger Details</h2>

                {passengers.map((_, i) => {
                    const p = buildPassengerDetails(i);
                    const props = {
                        name: p.personal.name,
                        email: p.personal.email,
                        phone: p.personal.phone,
                        passport: p.personal.passport,
                        departure: {
                            seat: p.segments.outbound.seat,
                            meal: p.segments.outbound.meal,
                            baggage: p.segments.outbound.baggageLabel,
                        },
                        ...(p.segments.return.seat !== '–' && {
                            return: {
                                seat: p.segments.return.seat,
                                meal: p.segments.return.meal,
                                baggage: p.segments.return.baggageLabel,
                            },
                        }),
                    };
                    return <PassengerInfo key={i} {...props} />;
                })}

                <div className="space-y-6 pb-6">
                    <BookingSummary data={bookingData}/>
                </div>

                <div className="flex justify-between pb-6 text-base font-semibold">
                    <span>Total:</span>
                    <span className="text-blue-700">${total}</span>
                </div>
            </div>

            {/* Responsive Button Row */}
            <div className="mt-6 mb-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
                <button
                    onClick={() => router.back()}
                    className="bg-white text-black py-3 px-6 rounded-md font-semibold w-full sm:w-auto border border-gray-300 hover:bg-gray-100 transition"
                >
                    Return
                </button>
                <button
                    onClick={() => router.push("/payment")}
                    className="bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-md font-semibold w-full sm:w-auto"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
