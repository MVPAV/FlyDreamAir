import {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {getUserByEmail, getUserById} from "src/server/db/users";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async jwt({token}) {
            if (token.sub) {
                const user = await getUserById(token.sub); // Refetch updated user
                if (user) {
                    token.id = user.id;
                    token.firstName = user.firstName;
                    token.lastName = user.lastName;
                    token.phoneNumber = user.phoneNumber;
                    token.dateOfBirth = user.dateOfBirth?.toISOString() ?? '';
                    token.emergencyName = user.emergencyName;
                    token.emergencyPhone = user.emergencyPhone;
                    token.emergencyRelationship = user.emergencyRelationship;
                }
            }
            return token;
        },

        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.phoneNumber = token.phoneNumber as string;
                session.user.dateOfBirth = token.dateOfBirth as Date;
                session.user.emergencyName = token.emergencyName as string;
                session.user.emergencyPhone = token.emergencyPhone as string;
                session.user.emergencyRelationship = token.emergencyRelationship as string;
            }
            return session;
        },
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await getUserByEmail(credentials.email);
                if (!user || !user.password) return null;

                const passwordCorrect = await compare(credentials.password, user.password);
                if (!passwordCorrect) return null;

                return {
                    id: user.id,
                    email: user.email,
                    image: user.image ?? undefined,
                    firstName: user.firstName ?? '',
                    lastName: user.lastName ?? '',
                    phoneNumber: user.phoneNumber ?? '',
                    dateOfBirth: user.dateOfBirth ?? undefined,
                    emergencyName: user.emergencyName ?? '',
                    emergencyPhone: user.emergencyPhone ?? '',
                    emergencyRelationship: user.emergencyRelationship ?? '',
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
