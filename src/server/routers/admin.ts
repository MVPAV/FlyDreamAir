import {router, publicProcedure} from '../trpc';
import {z} from 'zod';
import {deleteUser, getAllUsers} from "src/server/db/admin/users";
import {deletePassenger, getAllPassengers} from "src/server/db/admin/passengers";
import {deleteBooking, getAllBookings} from "src/server/db/admin/bookings";

export const adminRouter = router({
    getAllUsers: publicProcedure.query(async () => {
        return await getAllUsers();
    }),

    deleteUser: publicProcedure
        .input(z.object({
            userId: z.string()
        }))
        .mutation(async ({input}) => {
            return await deleteUser(input.userId);
        }),

    getAllPassengers: publicProcedure.query(async () => {
        return await getAllPassengers()
    }),

    deletePassenger: publicProcedure
        .input(z.object({
            passengerId: z.string()
        }))
        .mutation(async ({input}) => {
            return await deletePassenger(input.passengerId);
        }),

    getAllBookings: publicProcedure.query(async () => {
        return await getAllBookings()
    }),

    deleteBooking: publicProcedure
        .input(z.object({
            bookingId: z.string()
        }))
        .mutation(async ({input}) => {
            return await deleteBooking(input.bookingId);
        }),
});
