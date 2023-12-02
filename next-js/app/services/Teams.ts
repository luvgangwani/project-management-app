import { Pool } from "mysql2";
import pool from "./db";
import { ITeams } from "../interfaces";

class Teams {
    private pool: Pool;
    constructor() {
        this.pool = pool
    }

    create(team: ITeams) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                'insert into tbl_teams set ?;',
                {
                    name: team.name,
                    description: team.description,
                    manager_username: team.managerUsername,
                },
                (error, results, _fields) => {
                    if (error) reject(error)
                    if (results) resolve(results)
                }
            )
        })
    }

    getTeamsByUsername(username: string) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                `select
                id,
                name,
                description,
                manager_username,
                created,
                updated
                from vw_teams
                where manager_username = ?`,
                [username],
                (errors, results, _fields) => {
                    if (errors) reject(errors)
                    if (results) resolve(results)
                }
            )
        })
    }
}

export default Teams;
