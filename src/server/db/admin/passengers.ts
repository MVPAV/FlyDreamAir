import {prisma} from "src/server/db/prisma";

export async function deletePassenger(passengerId: string) {
    return await prisma.passenger.delete({where: {id: passengerId}});
}

export async function getAllPassengers() {
    return await prisma.passenger.findMany({});
}
