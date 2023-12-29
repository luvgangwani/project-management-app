import { Pool } from "mysql2";
import pool from "./db";

class TeamMembers {
    private pool: Pool;

    constructor() {
        this.pool = pool
    }

    add(teamId: number, memberUsername: string, managerUsername: string) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                'insert into tbl_team_members set ?',
                {
                    team_id: teamId,
                    member_username: memberUsername,
                    manager_username: managerUsername,
                },
                (error, results, _fields) => {
                    if(results) resolve(results)
                    if (error) reject(error)
                }
            )
        })
    }

    getMembersInATeam(teamId: number) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                `select
                    teamId,
                    teamName,
                    memberFirstName,
                    memberLastName,
                    memberFullName,
                    memberUsername,
                    managerFirstName,
                    managerLastName,
                    managerFullName,
                    managerUsername,
                    created,
                    updated
                from vw_team_members
                where teamId=?
                `,
                [teamId],
                (error, results, _fields) => {
                    if (error) reject(error)
                    if (results) resolve(results)
                }
            )
        })
    }
}

export default TeamMembers;
