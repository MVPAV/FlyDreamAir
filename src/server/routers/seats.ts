import {publicProcedure, router} from '../trpc';
import {z} from 'zod';
import {getSeatById, getSeatsBySegment} from "src/server/db/seats";

export const seatsRouter = router({
    getSeatsBySegment: publicProcedure
        .input(z.object({segmentId: z.string()}))
        .query(async ({ctx, input}) => {
            return getSeatsBySegment(input.segmentId);
        }),
    getSeatById: publicProcedure
        .input(z.object({seatId: z.string()}))
        .query(async ({ctx, input}) => {
            return getSeatById(input.seatId);
        }),
});
