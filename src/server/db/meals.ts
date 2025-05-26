import {prisma} from 'src/server/db/prisma';

export async function getMealTypes() {
    const mealTypes = await prisma.mealType.findMany({
        orderBy: {name: 'asc'},
    });

    return mealTypes;
}
