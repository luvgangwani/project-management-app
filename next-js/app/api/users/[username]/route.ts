import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Users from "@/app/controllers/Users";
import { RowDataPacket } from "mysql2";

const usersController = new Users

// Just indicates whether or not a user with a username exists
export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    const { username } = params

    const response = (await usersController.getUserByUsername(username)) as RowDataPacket

    try {
        if (response.length === 1)
            return NextResponse.json({
                success: true,
            }, { status: 200 })
        else
            return NextResponse.json({
                success: false,
            }, { status: 404 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error
        }, { status: 500 })
    }
}