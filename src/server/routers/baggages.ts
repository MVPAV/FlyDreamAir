import {publicProcedure, router} from '../trpc';
import {getBaggageTypes} from "src/db/baggages";

export const baggagesRouter = router({
    getBaggageTypes: publicProcedure
        .query(({input}) => {
            return getBaggageTypes()
        }),
});
