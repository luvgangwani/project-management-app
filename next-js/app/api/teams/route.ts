import Teams from "@/app/controllers/Teams";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { ITeams } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const teamsController = new Teams()

export async function POST(req: NextRequest) {
    try {
        const team = await req.json() as ITeams
    
        const response = await teamsController
                    .create(team)
        return NextResponse.json({
            success: true,
            ...response
        }, { status: 200 })
    } catch (error) {
        const { message, statusCode } = error as ProjectManagementAppAPIError
        return NextResponse.json({
            success: false,
            error: message,
        }, { status: statusCode })
    }
}
