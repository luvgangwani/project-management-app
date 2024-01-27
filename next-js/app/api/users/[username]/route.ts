import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Users from "@/app/controllers/Users";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";

const usersController = new Users

// Just indicates whether or not a user with a username exists
export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    const { username } = params
    try {
        const response = await usersController.getUserByUsername(username)
        return NextResponse.json({
            success: true,
            user: response
        }, { status: 200 })
    } catch (error) {
        const { message, statusCode } = error as ProjectManagementAppAPIError
        return NextResponse.json({
            success: false,
            error: message
        }, { status: statusCode })
    }
}