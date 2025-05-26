import {publicProcedure, router} from '../trpc';
import {getBaggageTypes} from "src/server/db/baggages";

export const baggagesRouter = router({
    getBaggageTypes: publicProcedure
        .query(({input}) => {
            return getBaggageTypes()
        }),
});
