import {prisma} from 'src/server/db/prisma';

export async function getBaggageTypes() {
    const baggageTypes = await prisma.baggageType.findMany({
        orderBy: { name: 'asc' },
    });

    return baggageTypes;
}
