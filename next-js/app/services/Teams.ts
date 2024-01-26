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
                teamid,
                teamName,
                teamDescription,
                managerFullName,
                managerUsername,
                created,
                updated
                from vw_team_members
                where memberUsername = ?`,
                [username],
                (errors, results, _fields) => {
                    if (errors) reject(errors)
                    if (results) resolve(results)
                }
            )
        })
    }

    getTeamsCreatedByUsername(username: string) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                `select
                id,
                name,
                description,
                managerFullName,
                managerUsername,
                created,
                updated
                from vw_teams
                where managerUsername = ?`,
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
