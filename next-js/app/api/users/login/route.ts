import Users from "@/app/controllers/Users";
import { IAuth, ICreds } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const usersController = new Users();

export async function POST(req: NextRequest) {
    const creds = (await req.json()) as ICreds
    const { token } = (await usersController.login(creds)) as IAuth

    try {
        if (token) {
            return NextResponse.json({
                success: true,
                token: token
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                token: ''
            }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            error,
        }, { status: 500 })
    }
}