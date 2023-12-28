import TeamMembers from "@/app/controllers/TeamMembers";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { ITeamMembers } from "@/app/interfaces";
import { decode, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const teamMmebersController = new TeamMembers()

export async function POST(req: NextRequest) {
    try {
        const teamMember = await req.json() as ITeamMembers

        const token = await getToken({ req })

        const response = await teamMmebersController
                                .add(teamMember.teamId, teamMember.memberUsername, token?.email)

        return NextResponse.json({
            success: true,
            ...response
        }, { status: 200 })
    } catch (error) {
        const { statusCode, message } = error as ProjectManagementAppAPIError;

        return NextResponse.json({
            success: false,
            error: message
        }, { status: statusCode })
    }
}