import { RowDataPacket } from "mysql2"

export type UsernameRouteParam = {
    params: {
        username: string
    }
}

export type TeamIdRouteParam = {
    params: {
        teamId: number
    }
}

export type TasksResponse = {
    assigned: RowDataPacket,
    reported: RowDataPacket
}