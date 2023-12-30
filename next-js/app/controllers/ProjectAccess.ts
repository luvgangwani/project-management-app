import ProjectAccessService from '@/app/services/ProjectAccess'
import { IProjectAccess } from '../interfaces'
import ProjectManagementAppAPIError from '../errors/ProjectManagementAppAPIError'
import { OkPacketParams } from 'mysql2'

class ProjectAccess {
    private service: ProjectAccessService

    constructor() {
        this.service = new ProjectAccessService()
    }

    async grant(projectAccess: IProjectAccess) {
        let data;

        if (!projectAccess.projectId || projectAccess.projectId <= 0) {
            throw new ProjectManagementAppAPIError('Please select a valid project.', 400)
        }

        if (!projectAccess.teamId || projectAccess.teamId <= 0) {
            throw new ProjectManagementAppAPIError('Please select a valid team.', 400)
        }

        if (!projectAccess.adminUsername) {
            throw new ProjectManagementAppAPIError('Please provide a valid manager. The session token might be invalid. Please try logging in again.')
        }

        try {
            data = await this
                        .service
                        .grant(projectAccess)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Unexpected error encountered while granting access to the project. Please try again. Details: ${error}`)
        }

        const response = data as OkPacketParams

        if (response.affectedRows && response.affectedRows > 0) {
            return {
                message: 'Access granted successfully.'
            }
        } else {
            throw new ProjectManagementAppAPIError('Sorry, we are unable to grant access to the project currently. Please try again in some time.')
        }

    }
}

export default ProjectAccess
