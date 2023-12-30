import ProjectAccess from "@/app/controllers/ProjectAccess";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { IProjectAccess } from "@/app/interfaces";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const projectAccessController = new ProjectAccess()

export async function POST(req: NextRequest) {
    try {
        const projectAccess = await req.json() as IProjectAccess

        const token = await getToken({ req })
        projectAccess.adminUsername = token?.email

        const response = await projectAccessController
                                .grant(projectAccess)
        
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