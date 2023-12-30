import TeamsService from '@/app/services/Teams';
import { ITeams } from '../interfaces';
import ProjectManagementAppAPIError from '../errors/ProjectManagementAppAPIError';
import { OkPacketParams, RowDataPacket } from 'mysql2';

class Teams {
    private service: TeamsService;
    constructor() {
        this.service = new TeamsService()
    }

    async create(team: ITeams) {
        let data;
        if (!team.name)
            throw new ProjectManagementAppAPIError('Please provide a team name', 400)

        if (!team.managerUsername)
            throw new ProjectManagementAppAPIError('Please provide a valid manager. The session token might be invalid. Please try logging in again.')
        
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

    async getTeamsByUsername(username: string) {
        let data;
        if (!username)
            throw new ProjectManagementAppAPIError('Please provide a username.', 400)
        try {
            data = await this
                    .service
                    .getTeamsByUsername(username)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Error fetching teams' information for "${username}": ${error}`)
        }

        const response = data as RowDataPacket
        if (response.length > 0) {
            return {
                teams: response
            }
        } else {
            return {
                message: 'You have not created any teams.'
            }
        }

    }
}

export default Teams;
