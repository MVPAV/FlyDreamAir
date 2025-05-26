import {prisma} from 'src/db/prisma';

export async function getBaggageTypes() {
    const baggageTypes = await prisma.baggageType.findMany({
        orderBy: { name: 'asc' },
    });

    return baggageTypes;
}
