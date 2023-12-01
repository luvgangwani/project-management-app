import Users from "@/app/controllers/Users";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { IUsers } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const usersController = new Users()

export async function POST(req: NextRequest) {
    try {
        const user = await req.json()
        const response = await usersController.register(user as IUsers)

        return NextResponse.json({
            success: true,
            ...response
        }, { status: 200 })
    } catch (error) {
        const { message , statusCode } = error as ProjectManagementAppAPIError
        return NextResponse.json({
            success: false,
            error: message
        }, { status: statusCode })
    }
}
