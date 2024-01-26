import Teams from "@/app/controllers/Teams";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const teamsController = new Teams()

export async function GET(req: NextRequest) {
    const token = await getToken({ req })
    try {
        const response = await teamsController.getTeamsCreatedByUsername(token?.email)
        return NextResponse.json({
            success: true,
            ... response
        }, { status: 200 })
    } catch (error) {
        const { message, statusCode } = error as ProjectManagementAppAPIError
        return NextResponse.json({
            succes: false,
            error: message
        }, { status: statusCode })
    }
}
