import { Pool } from "mysql2";
import pool from "./db";
import { IProjectAccess } from "../interfaces";

class ProjectAccess {
    private pool:Pool

    constructor() {
        this.pool = pool
    }

    grant(projectAccess: IProjectAccess) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                'insert into tbl_project_access set ?',
                {
                    project_id: projectAccess.projectId,
                    team_id: projectAccess.teamId,
                    admin_username: projectAccess.adminUsername
                },
                (error, result, _fields) => {
                    if (error) reject(error)
                    if (result) resolve(result)
                }
            )
        })
    }
}

export default ProjectAccess;
