import { User, getServerSession } from "next-auth"
import authOptions from "./api/auth/[...nextauth]/auth-options"

export const getAuthUser = async (): Promise<User | undefined> => {
    const session = await getServerSession(authOptions)

    return session?.user
}
