import {router} from 'src/server/trpc';
import {exampleRouter} from 'src/server/routers/example';
import {flightsRouter} from "src/server/routers/flights";
import {seatsRouter} from "src/server/routers/seats";
import {baggagesRouter} from "src/server/routers/baggages";
import {mealsRouter} from "src/server/routers/meals";
import {bookingsRouter} from "src/server/routers/bookings";
import {adminRouter} from "src/server/routers/admin";
import {userRouter} from "src/server/routers/users";

export const appRouter = router({
    example: exampleRouter,
    users: userRouter,
    flights: flightsRouter,
    seats: seatsRouter,
    baggages: baggagesRouter,
    meals: mealsRouter,
    bookings: bookingsRouter,
    admin: adminRouter,
});

export type AppRouter = typeof appRouter;
