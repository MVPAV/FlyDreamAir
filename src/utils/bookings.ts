import {useSeatStore} from 'src/store/seatStore';
import {useMealTypeStore} from 'src/store/mealTypeStore';
import {useBaggageTypeStore} from 'src/store/baggageTypeStore';
import {useBookingStore} from 'src/store/bookingStore';

export function calculateTotalPriceFromStore() {
    const booking = useBookingStore.getState().currentBooking;
    const getSeatById = useSeatStore.getState().getSeatById;
    const getMealTypeById = useMealTypeStore.getState().getMealTypeById;
    const getBaggageTypeById = useBaggageTypeStore.getState().getBaggageTypeById;

    const passengers = booking.passengers;
    const itinerary = booking.itinerary;
    const fareClass = booking.flightClass;

    let total = 0;

    // Fares (outbound + return)
    for (const segment of [itinerary.outbound, itinerary.return]) {
        if (!segment) continue;
        const fare = segment.fares.find(f => f.fareClass === fareClass);
        total += fare?.price ?? 0;
    }

    for (const p of passengers) {
        // Seat prices
        total += p.tickets.reduce((sum, t) => {
            const seat = getSeatById(t.seatId);
            return sum + (seat?.price ?? 0);
        }, 0);

        // Meal prices
        total += p.meals.reduce((sum, m) => {
            const meal = getMealTypeById(m.typeId);
            return sum + (meal?.price ?? 0);
        }, 0);

        // Baggage prices
        total += p.baggages.reduce((sum, b) => {
            const bag = getBaggageTypeById(b.typeId);
            return sum + (bag?.price ?? 0);
        }, 0);
    }

    return total;
}
