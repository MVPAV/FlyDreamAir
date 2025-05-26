import {prisma} from 'src/server/db/prisma';
import {ClientBooking} from 'src/constants/types';

function generateBookingCode(): string {
    return 'FD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateTicketNumber(): string {
    return 'TCK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function confirmBooking(booking: ClientBooking, userId?: string) {
    const bookingCode = generateBookingCode();

    const itinerary = await prisma.itinerary.create({
        data: {
            segments: {
                connect: [
                    {id: booking.itinerary.outbound!.id},
                    ...(booking.itinerary.return ? [{id: booking.itinerary.return.id}] : []),
                ],
            },
        },
    });

    const passengerData = booking.passengers.map((p) => ({
        title: p.title,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        phoneNumber: p.phone,
        dateOfBirth: new Date(p.dob),
        passport: p.passport,
        tickets: {
            create: p.tickets.map((t) => ({
                segment: {connect: {id: t.segmentId}},
                seat: {connect: {id: t.seatId}},
                ticketNumber: generateTicketNumber(),
            })),
        },
        bags: {
            create: p.baggages.map((b) => ({
                type: {connect: {id: b.typeId}},
            })),
        },
        meals: {
            create: p.meals.map((m) => ({
                type: {connect: {id: m.typeId}},
            })),
        },
    }));

    const data: any = {
        itinerary: {connect: {id: itinerary.id}},
        bookingCode,
        totalPrice: booking.totalPrice,
        passengers: {
            create: passengerData,
        },
    };

    if (userId) {
        data.user = {connect: {id: userId}};
    }

    const created = await prisma.booking.create({data});
    return created;
}
