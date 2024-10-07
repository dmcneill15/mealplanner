import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "emial",
                    placeholder: "Enter email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Enter password"
                }
            },
            async authorize(credentials) {
                /*This is where we fetch from the database */
                const user = {
                    _id: "67024ff0b9f3eb113a652da4",
                    username: "Dan",
                    email: "dan@test.com",
                    image: "#",
                    password: "Testing"
                }
                if (credentials?.email == user.email && credentials?.password == user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.username = user.username;
                token.password = user.password;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.password = token.password;
            }
            return session;
        }
    },
}