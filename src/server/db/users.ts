import {prisma} from "src/server/db/prisma";

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({where: {email}});
}

export async function getUserById(id: string) {
    return await prisma.user.findUnique({where: {id}});
}

export async function createUser(data: { email: string; password: string }) {
    return await prisma.user.create({data});
}

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
        where: {id: userId},
        data: {
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        },
    });
}

export async function getUserBookings(
    userId: string,
) {
    return prisma.booking.findMany({
        where: {userId: userId},
        include: {
            itinerary: {
                include: {
                    segments: {
                        include: {
                            departureAirport: true,
                            arrivalAirport: true,
                        },
                    },
                },
            },
            passengers: {
                include: {
                    tickets: {
                        include: {
                            segment: {
                                include: {
                                    departureAirport: true,
                                    arrivalAirport: true,
                                    airline: true,
                                },
                            },
                            seat: true,
                        },
                    },
                    bags: {
                        include: {type: true},
                    },
                    meals: {
                        include: {type: true},
                    },
                },
            },
        },
        orderBy: {
            bookedAt: "desc",
        },
    });
}
