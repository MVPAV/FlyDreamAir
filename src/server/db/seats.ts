import {prisma} from 'src/server/db/prisma';

export async function getSeatsBySegment(segmentId: string) {
    const seats = await prisma.seat.findMany({
        where: {segmentId: segmentId},
        orderBy: [{seatNumber: 'asc'}],
    });

    return seats;
}

export async function getSeatById(seatId: string) {
    const seat = await prisma.seat.findUnique({
        where: {
            id: seatId,
        }
    })
    return seat;
}
