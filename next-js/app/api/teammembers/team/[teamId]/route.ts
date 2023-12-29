import { NextRequest, NextResponse } from "next/server";
import { TeamIdRouteParam } from "../../../types";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import TeamMembers from "@/app/controllers/TeamMembers";

const teamMembersController = new TeamMembers()

export async function GET(req: NextRequest, { params }: TeamIdRouteParam) {
    try {
        const response = await teamMembersController.getMembersInATeam(params.teamId)

        return NextResponse.json({
            success: true,
            ...response
        }, { status: 200 })
    } catch (error) {
        const { statusCode, message } = error as ProjectManagementAppAPIError

        return NextResponse.json({
            success: false,
            error: message
        }, { status: statusCode })
    }
}