import {prisma} from 'src/server/db/prisma';
import {startOfDay, endOfDay} from 'date-fns';

export async function getFlights(from: string, to: string, departureDate: Date) {
    const start = startOfDay(departureDate);
    const end = endOfDay(departureDate);

    const flightSegments = await prisma.flightSegment.findMany({
        where: {
            departureAirport: {
                code: from,
            },
            arrivalAirport: {
                code: to,
            },
            departureTime: {
                gte: start,
                lte: end,
            },
        },
        include: {
            departureAirport: true,
            arrivalAirport: true,
            airline: true,
            fares: true,
            tickets: true,
        },
        orderBy: {
            departureTime: 'asc',
        },
    });

    return flightSegments.map((segment) => ({
        ...segment,
        seatsAvailable: segment.seatCapacity - segment.tickets.length,
    }));
}
