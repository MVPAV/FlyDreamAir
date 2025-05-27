import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            image?: string;
            firstName?: string;
            lastName?: string;
            phoneNumber?: string;
            dateOfBirth?: Date;
            emergencyName?: string;
            emergencyPhone?: string;
            emergencyRelationship?: string;
        };
    }

    interface User {
        id: string;
        email: string;
        image?: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        emergencyName?: string;
        emergencyPhone?: string;
        emergencyRelationship?: string;
    }
}
