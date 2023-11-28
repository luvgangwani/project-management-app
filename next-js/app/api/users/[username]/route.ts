import { NextRequest, NextResponse } from "next/server";
import { UsernameRouteParam } from "../../types";
import Users from "@/app/controllers/Users";
import { RowDataPacket } from "mysql2";

const usersController = new Users

export async function GET(req: NextRequest, { params }: UsernameRouteParam) {
    const { username } = params
    console.log(username)

    const response = (await usersController.getUserByUsername(username)) as RowDataPacket

    try {
        if (response.length === 1)
            return NextResponse.json({
                success: true,
                response: response[0]
            }, { status: 200 })
        else
            return NextResponse.json({
                success: false,
                response: {}
            }, { status: 404 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error
        }, { status: 500 })
    }
}