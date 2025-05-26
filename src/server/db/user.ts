import { prisma } from "src/server/db/prisma";

export async function updateUserProfile(
    userId: string,
    data: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        dateOfBirth?: string;
        emergencyName?: string;
        emergencyPhone?: string;
        emergencyRelationship?: string;
    }
) {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        },
    });
}
