import Users from "@/app/controllers/Users";
import { IAuth, ICreds } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const usersController = new Users();

export async function POST(req: NextRequest) {
    try {
        const creds = (await req.json()) as ICreds
        const { token } = (await usersController.login(creds)) as IAuth
        if (token) {
            return NextResponse.json({
                success: true,
                token: token
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                token: null
            }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message,
        }, { status: 500 })
    }
}