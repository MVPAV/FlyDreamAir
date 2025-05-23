import {PrismaClient} from '@prisma/client';
import {addDays, addHours} from 'date-fns';

const prisma = new PrismaClient();

async function main() {
    // Airports
    const [syd, mel, bne, adl] = await prisma.$transaction([
        prisma.airports.create({data: {code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia'}}),
        prisma.airports.create({
            data: {
                code: 'MEL',
                name: 'Melbourne Airport',
                city: 'Melbourne',
                country: 'Australia'
            }
        }),
        prisma.airports.create({data: {code: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia'}}),
        prisma.airports.create({data: {code: 'ADL', name: 'Adelaide Airport', city: 'Adelaide', country: 'Australia'}})
    ]);

    // Airlines
    const [qantas, jetstar] = await prisma.$transaction([
        prisma.airlines.create({data: {name: 'Qantas Airways', code: 'QF'}}),
        prisma.airlines.create({data: {name: 'Jetstar', code: 'JQ'}})
    ]);

    // Flights
    const baseDate = new Date('2025-07-01T08:00:00Z');

    const flights = await prisma.$transaction([
        prisma.flights.create({
            data: {
                flightNumber: 'QF400',
                departureTime: baseDate,
                arrivalTime: addHours(baseDate, 2),
                duration: 120,
                price: 149.99,
                seatsAvailable: 180,
                departureId: syd.id,
                destinationId: mel.id,
                airlineId: qantas.id
            }
        }),
        prisma.flights.create({
            data: {
                flightNumber: 'JQ802',
                departureTime: addDays(baseDate, 1),
                arrivalTime: addDays(addHours(baseDate, 3), 1),
                duration: 180,
                price: 99.99,
                seatsAvailable: 150,
                departureId: mel.id,
                destinationId: bne.id,
                airlineId: jetstar.id
            }
        }),
        prisma.flights.create({
            data: {
                flightNumber: 'QF112',
                departureTime: addDays(baseDate, 2),
                arrivalTime: addDays(addHours(baseDate, 2), 2),
                duration: 120,
                price: 129.99,
                seatsAvailable: 160,
                departureId: bne.id,
                destinationId: adl.id,
                airlineId: qantas.id
            }
        })
    ]);

    // Passengers
    const passengers = await prisma.$transaction([
        prisma.passengers.create({data: {name: 'Alice Brown', email: 'alice@example.com', passport: 'P0001112'}}),
        prisma.passengers.create({data: {name: 'Bob Stone', email: 'bob@example.com', passport: 'P0002223'}}),
        prisma.passengers.create({data: {name: 'Clara Chen', email: 'clara@example.com', passport: 'P0003334'}}),
        prisma.passengers.create({data: {name: 'David Kim', email: 'david@example.com', passport: 'P0004445'}})
    ]);

    // Bookings
    await prisma.bookings.createMany({
        data: [
            {
                flightId: flights[0].id,
                passengerId: passengers[0].id,
                seatNumber: 'A1',
                status: 'Confirmed',
                bookedAt: new Date()
            },
            {
                flightId: flights[0].id,
                passengerId: passengers[1].id,
                seatNumber: 'B1',
                status: 'Confirmed',
                bookedAt: new Date()
            },
            {
                flightId: flights[1].id,
                passengerId: passengers[2].id,
                seatNumber: 'C2',
                status: 'Confirmed',
                bookedAt: new Date()
            },
            {
                flightId: flights[2].id,
                passengerId: passengers[3].id,
                seatNumber: 'D3',
                status: 'Confirmed',
                bookedAt: new Date()
            }
        ]
    });

    console.log('🚀 Sample data inserted successfully');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
