import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Tasks from "@/app/controllers/Tasks";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";

const tasksController = new Tasks();

export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    try {
        const response = await tasksController.getTasksByUsername(params.username)

        return NextResponse.json({
            success: true,
            ...response
        }, { status: 200 })
    } catch (error) {
        const { statusCode, message} = error as ProjectManagementAppAPIError

        return NextResponse.json({
            success: false,
            error: message
        }, { status: statusCode })
    }
}