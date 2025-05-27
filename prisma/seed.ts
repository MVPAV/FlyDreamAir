import {FareClass, PrismaClient} from '@prisma/client';
import {subMinutes} from 'date-fns'; // ✅ Import from date-fns

const prisma = new PrismaClient();

async function main() {
    // Seed airline
    const qantas = await prisma.airline.upsert({
        where: {code: 'QF'},
        update: {},
        create: {
            id: 'qf-id',
            name: 'Qantas Airways',
            code: 'QF',
        },
    });

    // Seed airports
    const airportMap: Record<string, string> = {};
    const airports = [
        {code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney'},
        {code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne'},
        {code: 'BNE', name: 'Brisbane Airport', city: 'Brisbane'},
        {code: 'PER', name: 'Perth Airport', city: 'Perth'},
    ];

    for (const airport of airports) {
        const result = await prisma.airport.upsert({
            where: {code: airport.code},
            update: {},
            create: {
                id: `${airport.code.toLowerCase()}-id`,
                code: airport.code,
                name: airport.name,
                city: airport.city,
                country: 'Australia',
            },
        });
        airportMap[airport.code] = result.id;
    }

    // Flight segments
    const flightSegments = [
        {
            flightNumber: 'QF401',
            from: 'SYD',
            to: 'MEL',
            departure: new Date('2025-12-22T08:00:00+10:00'),
            arrival: new Date('2025-12-22T09:35:00+10:00'),
            seatCapacity: 180,
            fareClass: 'ECONOMY',
            gate: 'G2'
        },
        {
            flightNumber: 'QF402',
            from: 'MEL',
            to: 'SYD',
            departure: new Date('2025-12-22T18:00:00+10:00'),
            arrival: new Date('2025-12-22T19:40:00+10:00'),
            seatCapacity: 180,
            fareClass: 'ECONOMY',
            gate: 'T1'
        },
        {
            flightNumber: 'QF700',
            from: 'BNE',
            to: 'PER',
            departure: new Date('2025-07-02T07:00:00+10:00'),
            arrival: new Date('2025-07-02T12:10:00+08:00'),
            seatCapacity: 220,
            fareClass: 'BUSINESS',
            gate: 'S1'
        },
    ];

    for (const flight of flightSegments) {
        const boardingTime = subMinutes(flight.departure, 30);

        const segment = await prisma.flightSegment.upsert({
            where: {flightNumber: flight.flightNumber},
            update: {},
            create: {
                flightNumber: flight.flightNumber,
                departureTime: flight.departure,
                arrivalTime: flight.arrival,
                boardingTime,
                seatCapacity: flight.seatCapacity,
                fareClass: flight.fareClass as FareClass,
                airlineId: qantas.id,
                departureAirportId: airportMap[flight.from],
                arrivalAirportId: airportMap[flight.to],
                gate: flight.gate,
            },
        });

        // Add fare options
        await prisma.fare.createMany({
            data: [
                {
                    flightSegmentId: segment.id,
                    fareClass: 'ECONOMY',
                    price: 150,
                    refundable: false,
                    baggageIncluded: 20,
                    validUntil: new Date('2025-06-30T23:59:59+10:00'),
                },
                {
                    flightSegmentId: segment.id,
                    fareClass: 'BUSINESS',
                    price: 420,
                    refundable: true,
                    baggageIncluded: 30,
                    validUntil: new Date('2025-06-30T23:59:59+10:00'),
                },
            ],
        });
    }

    await prisma.baggageType.createMany({
        data: [
            {id: 'standard-id', name: 'Standard', maxWeight: 20, price: 30},
            {id: 'oversized-id', name: 'Oversized', maxWeight: 32, price: 50},
            {name: 'Cabin', maxWeight: 7, price: 0},
        ],
        skipDuplicates: true,
    });

    await prisma.mealType.createMany({
        data: [
            {name: 'Standard', description: 'Regular meal with meat and vegetables.', price: 0},
            {name: 'Vegetarian', description: 'Meat-free meal with dairy and vegetables.', price: 5},
            {name: 'Vegan', description: 'No meat, dairy, or animal products.', price: 7},
            {name: 'Halal', description: 'Prepared in accordance with Islamic dietary laws.', price: 6},
            {name: 'Kosher', description: 'Prepared in accordance with Jewish dietary laws.', price: 6},
        ],
        skipDuplicates: true,
    });

    const getSeatType = (col: string): 'WINDOW' | 'AISLE' | 'MIDDLE' => {
        if (['A', 'F'].includes(col)) return 'WINDOW';
        if (['C', 'D'].includes(col)) return 'AISLE';
        return 'MIDDLE';
    };

    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    const rows = Array.from({length: 10}, (_, i) => i + 1);

    async function createSeatsForSegment(segmentId: string) {
        const seats = rows.flatMap(row =>
            columns.map(col => {
                const seatNumber = `${row}${col}`;
                const seatType = getSeatType(col);
                const isPremium = row <= 3;
                return {
                    seatNumber,
                    seatType,
                    isAvailable: true,
                    price: isPremium ? 40 : 10,
                    segmentId,
                };
            })
        );
        await prisma.seat.createMany({data: seats});
    }

    let segments = await prisma.flightSegment.findMany({
        where: {
            flightNumber: {
                in: ['QF401', 'QF402']
            }
        },
    });

    for (let segment of segments) {
        await createSeatsForSegment(segment.id);

    }

    console.log('✅ Seeded');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
