import {publicProcedure, router} from '../trpc';
import {z} from 'zod';

export const exampleRouter = router({
    hello: publicProcedure
        .input(z.object({name: z.string()}))
        .query(({input}) => {
            return {message: `Hello, ${input.name}`};
        }),
});
