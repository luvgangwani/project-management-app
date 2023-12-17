import { Pool } from "mysql2";
import pool from "./db";
import { IProjects } from "../interfaces";

class Projects {
    private pool: Pool
    
    constructor() {
        this.pool = pool
    }

    create(project: IProjects) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                `insert into tbl_projects set ?`,
                {
                    name: project.name,
                    manager_username: project.managerUsername,
                },
                (error, results, _fields) => {
                    if (error) reject(error)
                    if (results) resolve(results)
                }
            )
        })
    }
}

export default Projects
