import {publicProcedure, router} from '../trpc';
import {getMealTypes} from "src/db/meals";

export const mealsRouter = router({
    getMealTypes: publicProcedure
        .query(({input}) => {
            return getMealTypes()
        }),
});
