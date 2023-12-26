import { RowDataPacket } from "mysql2"

export type UsernameRouteParam = {
    params: {
        username: string
    }
}

export type TasksResponse = {
    assigned: RowDataPacket,
    reported: RowDataPacket
}