import Users from "@/app/controllers/Users";
import { IUsersView } from "@/app/interfaces";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const usersController = new Users()

let authUser: IUsersView;

const authOptions: AuthOptions = {
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
            if (authUser) {
                token.authUser = authUser
            }
            return token
        },

        async session({ session, token }) {
            if (session.user && token.authUser) {
                session.user = token.authUser as User
            }
            return session
        }
    }
}

export default authOptions;
