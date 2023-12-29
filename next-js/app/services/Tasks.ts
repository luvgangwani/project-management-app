import { Pool, RowDataPacket } from "mysql2";
import pool from "./db";
import { ITasks } from "../interfaces";
import { TasksResponse } from "../api/types";

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

    getTasksByUsername(username: string) {
        const response = {} as TasksResponse
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                'select * from vw_tasks where assigneeUsername = ?',
                [username],
                (errorAssignee, resultsAssignee, _fieldsAssignee) => {
                    if (resultsAssignee) {
                        response.assigned = resultsAssignee as RowDataPacket
                        this
                        .pool
                        .query(
                            'select * from vw_tasks where reporterUsername = ?',
                            [username],
                            (errorReporter, resultsReporter, _fieldsReporter) => {
                                if (resultsReporter) {
                                    response.reported = resultsReporter as RowDataPacket
                                    resolve(response)
                                }
                                if (errorReporter) reject(errorReporter)
                            }
                        )
                    }
                    if (errorAssignee) reject(errorAssignee)
                }
            )
        })
    }
}

export default Tasks;
