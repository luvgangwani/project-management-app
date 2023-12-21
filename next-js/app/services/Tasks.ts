import { Pool } from "mysql2";
import pool from "./db";
import { ITasks } from "../interfaces";

class Tasks {
    private pool: Pool
    constructor() {
        this.pool = pool
    }

    create(task: ITasks) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                'insert into tbl_tasks set ?',
                {
                    name: task.name,
                    description: task.description,
                    status_id: task.statusId,
                    story_points: task.storyPoints,
                    type_id: task.typeId,
                    project_id: task.projectId,
                    assignee_username: task.assigneeUsername,
                    reporter_username: task.reporterUsername,
                },
                (error, results, _fields) => {
                    if (error) reject(error)
                    if (results) resolve(results)
                }
            )
        })
    }
}

export default Tasks;
