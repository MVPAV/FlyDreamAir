import {prisma} from "src/server/db/prisma";

export async function deleteUser(userId: string) {
    return await prisma.user.delete({where: {id: userId}});
}

export async function getAllUsers() {
    return await prisma.user.findMany({
        include: {
            bookings: true,
        }
    });
}
