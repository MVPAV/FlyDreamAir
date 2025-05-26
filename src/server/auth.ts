import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getUserByEmail } from "src/server/db/users";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async session({ session, token, user }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            if (session.user && user) {
                session.user.firstName = user.firstName;
                session.user.lastName = user.lastName;
                session.user.phoneNumber = user.phoneNumber;
                session.user.dateOfBirth = user.dateOfBirth;
                session.user.emergencyName = user.emergencyName;
                session.user.emergencyPhone = user.emergencyPhone;
                session.user.emergencyRelationship = user.emergencyRelationship;
            }

            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
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
                    emergencyName: user.emergencyName ?? undefined,
                    emergencyPhone: user.emergencyPhone ?? undefined,
                    emergencyRelationship: user.emergencyRelationship ?? undefined,
                };
            },
        }),
    ],
};
