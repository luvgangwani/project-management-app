import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Teams from "@/app/controllers/Teams";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";

const teamsController = new Teams()

export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    const { username } = params

    try {
        const response = await teamsController.getTeamsByUsername(username)
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