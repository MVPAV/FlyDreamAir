import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Seat} from '@prisma/client';
import {immer} from 'zustand/middleware/immer';

interface SeatState {
    seatsBySegment: Record<string, Seat[]>;
    setSeatsForSegment: (segmentId: string, seats: Seat[]) => void;
    getSeatNumberById: (seatId: string) => string | undefined;
    getSeatById: (seatId: string) => Seat | undefined;
}

export const useSeatStore = create<SeatState>()(
    persist(
        immer((set, get) => ({
            seatsBySegment: {},

            setSeatsForSegment: (segmentId, seats) => {
                set((state) => {
                    state.seatsBySegment[segmentId] = seats;
                });
            },

            getSeatNumberById: (seatId) => {
                const allSeats = Object.values(get().seatsBySegment).flat();
                return allSeats.find((seat) => seat.id === seatId)?.seatNumber;
            },

            getSeatById: (id) => {
                const allSeats = Object.values(get().seatsBySegment).flat();
                return allSeats.find((type) => type.id === id)
            },
        })),
        {
            name: 'flydreamair-seat-store',
        }
    )
);
