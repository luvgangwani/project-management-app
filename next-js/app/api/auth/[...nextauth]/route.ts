import Users from "@/app/controllers/Users";
import { IUsers, IUsersView } from "@/app/interfaces";
import { User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const usersController = new Users()

let authUser: IUsersView;

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'your credentials',
            credentials: {
                username: {
                    label: 'Username',
                    placeholder: 'username',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials, req) {
                authUser = await usersController.login(credentials) as IUsersView
                if (authUser) return {
                    id: authUser.id,
                    email: authUser.username
                } as unknown as Promise<User>
                return null
            },
        })
    ],
    callbacks: {
        async jwt({ token }) {
            token.role = authUser.role
            return token
        },
    }
})

export { handler as GET, handler as POST }
