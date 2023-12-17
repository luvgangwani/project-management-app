import Projects from "@/app/controllers/Projects";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { IProjects } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const projectsController = new Projects()

export async function POST(req: NextRequest) {
    try {
        const project = await req.json() as IProjects

        const response = await projectsController.create(project)

        return NextResponse.json({
            success: true,
            ...response
        }, { status: 200 })
    } catch (error) {
        const { statusCode, message } = error as ProjectManagementAppAPIError
        return NextResponse.json({
            success: false,
            error: message,
        }, { status: statusCode })
    }
}