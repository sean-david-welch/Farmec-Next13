import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '~/lib/prisma';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "jsmith" },
        //         password: { label: "Password", type: "password" }
        //       },
        //       async authorize(credentials, req) {
        //         // Add logic here to look up the user from the credentials supplied
        //         const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        //         if (user) {
        //           // Any object returned will be saved in `user` property of the JWT
        //           return user
        //         } else {
        //           // If you return null then an error will be displayed advising the user to check their details.
        //           return null

        //           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        //         }
        //       }
        //     }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token && session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
            }
            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token?.email,
                },
            });

            if (dbUser) {
                token.id = dbUser.id;
                token.email = dbUser.email;
                token.name = dbUser.name;
                token.image = dbUser.image;
                token.role = dbUser.role;
            } else if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
                token.role = user.role;
            }

            return token;
        },
    },
};
