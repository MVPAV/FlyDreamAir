import {prisma} from "src/server/db/prisma";

export async function deleteBooking(bookingId: string) {
    return prisma.booking.delete({where: {id: bookingId}});
}

export async function getAllBookings() {
    return prisma.booking.findMany({
        include: {
            user: true,
            passengers: true,
        }
    });
}
