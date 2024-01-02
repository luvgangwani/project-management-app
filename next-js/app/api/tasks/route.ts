import Tasks from "@/app/controllers/Tasks";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { ITasks } from "@/app/interfaces";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const tasksController = new Tasks();

export async function POST(req: NextRequest) {
  try {
    const task = (await req.json()) as ITasks;

    const token = await getToken({ req })

    task.reporterUsername = token?.email
    
    const response = {} // await tasksController.create(task);

    return NextResponse.json(
      {
        success: true,
        ...response,
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, message } = error as ProjectManagementAppAPIError;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: statusCode }
    );
  }
}
