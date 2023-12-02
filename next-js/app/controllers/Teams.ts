import TeamsService from '@/app/services/Teams';
import { ITeams } from '../interfaces';
import ProjectManagementAppAPIError from '../errors/ProjectManagementAppAPIError';
import { OkPacketParams } from 'mysql2';

class Teams {
    private service: TeamsService;
    constructor() {
        this.service = new TeamsService()
    }

    async create(team: ITeams) {
        let data;
        if (!team.name)
            throw new ProjectManagementAppAPIError('Please provide a team name', 401)
        try {
            data = await this
            .service
            .create(team)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Error creating a new team: ${error}`)
        }

        const response = data as OkPacketParams

        if (response.insertId) {
            return {
                message: `Team "${team.name}" created successfully.`
            }
        } else {
            throw new ProjectManagementAppAPIError('Sorry, we are unable to create a new team currently. Please try again in some time.')
        }
    }
}

export default Teams;
