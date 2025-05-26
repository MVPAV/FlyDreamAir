import {prisma} from "src/server/db/prisma";

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({where: {email}});
}

export async function createUser(data: { email: string; password: string }) {
    return await prisma.user.create({data});
}
