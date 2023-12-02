import Users from "@/app/controllers/Users";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { IAuth, ICreds } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const usersController = new Users();

export async function POST(req: NextRequest) {
    try {
        const creds = (await req.json()) as ICreds
        const { token } = (await usersController.login(creds)) as IAuth
        let success = false
        let status = 401
        if (token) {
            success = true
            status = 200
        }
        return NextResponse.json({
            success,
            token
        }, { status })
    } catch (error) {
        const { message, statusCode } = error as ProjectManagementAppAPIError
        return NextResponse.json({
            success: false,
            error: message,
        }, { status: statusCode })
    }
}