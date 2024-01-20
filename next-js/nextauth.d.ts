// https://reacthustle.com/blog/extend-user-session-nextauth-typescript

import { DefaultSession, DefaultUser } from "next-auth";
import { IUsersView } from "./app/interfaces";

declare module "next-auth" {
    interface User extends IUsersView {}

    interface Session extends DefaultSession {
        user?: User & DefaultUser
    }
}