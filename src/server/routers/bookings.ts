import {publicProcedure, router} from '../trpc';
import {z} from 'zod';
import {confirmBooking, findBookingByReference} from 'src/server/db/bookings';
import {ServerClient} from 'postmark';
import * as process from 'node:process';
import {ClientBooking} from "src/constants/types";
import {useSeatStore} from "src/store/seatStore";
import {useMealTypeStore} from "src/store/mealTypeStore";
import {useBaggageTypeStore} from "src/store/baggageTypeStore";

export const bookingsRouter = router({
    confirmBooking: publicProcedure
        .input(
            z.object({
                booking: z.any(),
                userId: z.string().optional(),
            })
        )
        .mutation(async ({ctx, input}) => {
            const {userId} = input;
            const booking = input.booking as ClientBooking;
            const newBooking = await confirmBooking(booking, userId);

            const getSeatNumberById = useSeatStore.getState().getSeatNumberById;
            const getMealTypeById = useMealTypeStore.getState().getMealTypeById;
            const getBaggageTypeById = useBaggageTypeStore.getState().getBaggageTypeById;

            if (process.env.POSTMARK_CLIENT) {
                const client = new ServerClient(process.env.POSTMARK_CLIENT);

                // Extract values from booking object
                const passengerNames = booking.passengers
                    .map(p => `${p.title} ${p.firstName} ${p.lastName}`)
                    .join(', ');

                const departureDateStr = booking.itinerary.outbound?.departureTime
                    ? new Date(booking.itinerary.outbound.departureTime).toLocaleDateString()
                    : 'N/A';

                const returnDateStr = booking.itinerary.return?.departureTime
                    ? new Date(booking.itinerary.return.departureTime).toLocaleDateString()
                    : 'N/A';

                await client.sendEmailWithTemplate({
                    From: "nvn994@uowmail.edu.au",
                    To: booking.passengers[0].email,
                    TemplateAlias: "booking-confirmation",
                    TemplateModel: {
                        product_url: "https://yourdomain.com",
                        product_name: "FlyDreamAir",
                        name: booking.passengers[0].firstName,
                        company_name: "FlyDreamAir",
                        booking_code: newBooking,
                        passenger_names: passengerNames,
                        flight_class: booking.flightClass,
                        total_price: `$${booking.totalPrice}`,
                        booking_status: "Confirmed",
                        departure_code: booking.itinerary.outbound?.departureAirport.code ?? '–',
                        arrival_code: booking.itinerary.outbound?.arrivalAirport.code ?? '–',
                        departure_date: departureDateStr,
                        return_date: returnDateStr,
                        manage_booking_url: `https://flydreamair.it.com/manage-booking/?reference=${newBooking.bookingCode}&lastName=${booking.passengers[0].lastName}`,
                        support_email: "support@flydreamair.it.com",
                        help_url: "https://flydreamair.it.com/help",
                        sender_name: "FlyDreamAir Support",
                        year: new Date().getFullYear(),
                        company_address: "123 Dream St, Sydney, NSW, Australia",
                    },
                });
            }

            return {success: true, bookingId: newBooking.id};
        }),

    findBookingByReference: publicProcedure
        .input(z.object({reference: z.string(), lastName: z.string()}))
        .query(async ({input}) => {
            const booking = await findBookingByReference(input.reference, input.lastName);
            return booking
        }),
});
