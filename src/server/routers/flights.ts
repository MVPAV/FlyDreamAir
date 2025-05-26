import {publicProcedure, router} from '../trpc';
import {z} from 'zod';
import {getFlights} from 'src/server/db/flights';

export const flightsRouter = router({
    getFlights: publicProcedure
        .input(
            z.object({
                from: z.string().min(3).max(3),
                to: z.string().min(3).max(3),
                departureDate: z.date(),
            })
        )
        .query(({input}) => {
            const {from, to, departureDate} = input;
            return getFlights(from, to, departureDate);
        }),
});
