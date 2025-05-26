import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {getUserByEmail} from "src/server/db/users";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email);

                if (!user || !user.password) {
                    return null;
                }

                const passwordCorrect = await compare(credentials.password, user.password);

                if (passwordCorrect) {
                    return {
                        id: user.id,
                        email: user.email,
                    };
                }

                return null;
            }
        }),
    ],
});

export { handler as GET, handler as POST };
