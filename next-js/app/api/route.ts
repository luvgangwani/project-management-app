import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: 'Project Management App API'
    })
}