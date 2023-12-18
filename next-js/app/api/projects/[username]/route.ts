import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Projects from "@/app/controllers/Projects";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";

const projectsController = new Projects()

export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    try {

        const response = await projectsController.getProjectsByUsername(params.username)

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