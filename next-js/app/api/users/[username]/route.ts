import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Users from "@/app/controllers/Users";
import { IUserExists } from "@/app/interfaces";

const usersController = new Users

// Just indicates whether or not a user with a username exists
export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    const { username } = params

    
    try {
        const { userExists, message } = await usersController.getUserByUsername(username) as IUserExists
        return NextResponse.json({
            success: userExists,
            userExists,
            message,
        }, { status: userExists ? 200 : 404 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message
        }, { status: 500 })
    }
}