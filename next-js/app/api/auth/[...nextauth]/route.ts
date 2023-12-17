import Users from "@/app/controllers/Users";
import { User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const usersController = new Users()

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
                const auth = await usersController.login(credentials)
                if (auth) return auth as unknown as Promise<User>
                return null
            },
        })
    ]
})

export { handler as GET, handler as POST }
