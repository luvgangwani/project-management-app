import TasksService from '@/app/services/Tasks'
import { ITasks } from '../interfaces'
import ProjectManagementAppAPIError from '../errors/ProjectManagementAppAPIError'
import { OkPacketParams } from 'mysql2'
class Tasks {
    private service: TasksService

    constructor() {
        this.service = new TasksService()
    }

    async create(task: ITasks) {
        let data;

        if (!task.name)
            throw new ProjectManagementAppAPIError('Please provide a task name.', 400)

        if (!task.assigneeUsername)
            throw new ProjectManagementAppAPIError('Please select a task assignee.', 400)

        if (!task.statusId)
            throw new ProjectManagementAppAPIError('Please select a task status.', 400)

        if (task.storyPoints && task.storyPoints <= 0)
            throw new ProjectManagementAppAPIError('Please set a valid, positive value for story points.', 400)

        if (!task.typeId)
            throw new ProjectManagementAppAPIError('Please select a task type.', 400)

        try {
            data = await this
            .service
            .create(task)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Unexpected error creating a task. Please try again. Details: ${error}`)
        }

        const response = data as OkPacketParams

        if (response.insertId) {
            return {
                message: `Task "${task.name}" has been created successfully.`
            }
        } else {
            throw new ProjectManagementAppAPIError('Sorry, we are unable to create a task currently. Please try again in some time.')
        }
    }
}

export default Tasks
