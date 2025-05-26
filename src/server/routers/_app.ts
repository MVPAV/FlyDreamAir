import {router} from 'src/server/trpc';
import {exampleRouter} from 'src/server/routers/example';
import {flightsRouter} from "src/server/routers/flights";
import {seatsRouter} from "src/server/routers/seats";
import {baggagesRouter} from "src/server/routers/baggages";
import {mealsRouter} from "src/server/routers/meals";
import {bookingsRouter} from "src/server/routers/bookings";

export const appRouter = router({
    example: exampleRouter,
    flights: flightsRouter,
    seats: seatsRouter,
    baggages: baggagesRouter,
    meals: mealsRouter,
    bookings: bookingsRouter,
});

export type AppRouter = typeof appRouter;
