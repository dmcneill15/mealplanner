import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from '@/lib/dbConnect';
import User from '@/models/user'

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
                await connectToDatabase();

                console.log(credentials);
                const user = await User.findOne({
                    email_id: credentials?.email,
                });
                
                if(!user)
                    throw new Error("Unidentified Email");

                if (credentials?.password == user.password) {
                    return user;
                } else {
                    throw new Error("Incorrect Password");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.username = user.username;
                token.email_id = user.email_id;
                token.password = user.password;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.email_id = token.email_id;
                session.user.password = token.password;
            }
            return session;
        }
    },
}

/*export const options = {
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
}*/