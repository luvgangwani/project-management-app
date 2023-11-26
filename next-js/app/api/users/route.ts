import Users from "@/app/controllers/Users";
import { IUsers } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const usersController = new Users()

export async function POST(req: NextRequest) {
    try {
        const user = await req.json()
        const response = await usersController.register(user as IUsers)

        return NextResponse.json({
            response
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error
        }, { status: 401 })
    }
}
