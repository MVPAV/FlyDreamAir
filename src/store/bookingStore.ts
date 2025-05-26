import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {ClientBooking, ClientPassenger, FlightSegmentWithRelations} from 'src/constants/types';
import {FlightSegment} from '@prisma/client';
import {persist} from 'zustand/middleware';

interface BookingState {
    currentBooking: ClientBooking;

    // Booking setup
    initializeBooking: (flightClass: string, passengerCount: number) => void;
    resetBooking: () => void;

    // Passenger actions
    addPassenger: () => void;
    removePassenger: (index: number) => void;
    updatePassengerField: (
        index: number,
        field: keyof ClientPassenger,
        value: string
    ) => void;

    // Flight segment actions
    setOutboundSegment: (segment: FlightSegmentWithRelations) => void;
    setReturnSegment: (segment: FlightSegmentWithRelations) => void;

    // Seat actions
    updatePassengerTicketSeat: (passengerIndex: number, segment: FlightSegment, seatId: string) => void;

    // Baggage actions
    addBaggageItem: (passengerIndex: number, segmentId: string, typeId: string) => void;
    removeBaggageItem: (passengerIndex: number, segmentId: string, typeId: string) => void;

    // Meal actions
    addMealItem: (passengerIndex: number, segmentId: string, typeId: string) => void;
    removeMealItem: (passengerIndex: number, segmentId: string, typeId: string) => void;
    clearMealsForSegment: (pIndex: number, segmentId: string) => void;

    // Price action
    updateTotalPrice: (totalPrice: number) => void
}

// Helper to create a blank passenger
const initialPassenger = (): ClientPassenger => ({
    title: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    passport: '',
    tickets: [],
    baggages: [],
    meals: []
});

export const useBookingStore = create<BookingState>()(
    persist(immer((set) => ({
        currentBooking: {
            itinerary: {},
            passengers: [],
            flightClass: 'Economy',
            passengerCount: 1,
            totalPrice: 0
        },

        initializeBooking: (flightClass, passengerCount) =>
            set((state) => {
                state.currentBooking = {
                    itinerary: {},
                    passengers: Array.from({length: passengerCount}, () => initialPassenger()),
                    flightClass,
                    passengerCount,
                    totalPrice: 0
                };
            }),

        resetBooking: () =>
            set(() => ({
                currentBooking: {
                    itinerary: {},
                    passengers: [],
                    flightClass: 'Economy',
                    passengerCount: 1,
                },
            })),

        addPassenger: () =>
            set((state) => {
                state.currentBooking.passengers.push(initialPassenger());
                state.currentBooking.passengerCount++;
            }),

        removePassenger: (index) =>
            set((state) => {
                if (state.currentBooking.passengers.length > 1) {
                    state.currentBooking.passengers.splice(index, 1);
                    state.currentBooking.passengerCount--;
                }
            }),

        updatePassengerField: (index, field, value) =>
            set((state) => {
                const passenger = state.currentBooking.passengers[index];
                if (passenger) {
                    (passenger[field] as string) = value;
                }
            }),

        setOutboundSegment: (segment) =>
            set((state) => {
                state.currentBooking.itinerary.outbound = segment;
            }),

        setReturnSegment: (segment) =>
            set((state) => {
                state.currentBooking.itinerary.return = segment;
            }),

        updatePassengerTicketSeat: (passengerIndex, segment, seatId) =>
            set((state) => {
                const passenger = state.currentBooking.passengers[passengerIndex];
                if (!passenger) return;

                let ticket = passenger.tickets.find((t) => t.segmentId === segment.id);
                if (!ticket) {
                    ticket = {
                        segmentId: segment.id,
                        seatId: '',
                    };
                    passenger.tickets.push(ticket);
                }

                ticket.seatId = seatId;
            }),


        addBaggageItem: (index, segmentId, typeId) =>
            set(state => {
                state.currentBooking.passengers[index].baggages.push({
                    typeId,
                    segmentId,
                });
            }),

        removeBaggageItem: (index, segmentId, typeId) =>
            set(state => {
                const baggages = state.currentBooking.passengers[index].baggages;
                const i = baggages.findIndex(b => b.segmentId === segmentId && b.typeId === typeId);
                if (i !== -1) baggages.splice(i, 1);
            }),

        addMealItem: (index, segmentId, typeId) =>
            set((state) => {
                const passenger = state.currentBooking.passengers[index];
                if (!passenger) return;
                passenger.meals.push({segmentId, typeId});
            }),

        removeMealItem: (index, segmentId, typeId) =>
            set((state) => {
                const passenger = state.currentBooking.passengers[index];
                if (!passenger) return;
                passenger.meals = passenger.meals.filter(
                    (m) => !(m.segmentId === segmentId && m.typeId === typeId)
                );
            }),

        clearMealsForSegment: (pIndex: number, segmentId: string) =>
            set((state) => {
                state.currentBooking.passengers[pIndex].meals = state.currentBooking.passengers[pIndex].meals.filter(
                    (m) => m.segmentId !== segmentId
                );
            }),

        updateTotalPrice: (totalPrice: number) =>
            set((state) => {
                state.currentBooking.totalPrice = totalPrice;
            })
    })), {
        name: 'flydreamair-booking-store',
    })
);
