import { OkPacketParams, RowDataPacket } from "mysql2";
import ProjectManagementAppAPIError from "../errors/ProjectManagementAppAPIError"
import TeamMembersService from "../services/TeamMembers"
import { getToken } from "next-auth/jwt";

class TeamMembers {
    private service: TeamMembersService

    constructor() {
        this.service = new TeamMembersService()
    }

    async add(teamId: number, memberUsername: string, managerUsername: string | null | undefined) {
        let data;
        if (teamId <= 0) {
            throw new ProjectManagementAppAPIError('Please select a valid team.')
        }

        if (!memberUsername) {
            throw new ProjectManagementAppAPIError('Please select a valid username.')
        }

        if (!managerUsername) {
            throw new ProjectManagementAppAPIError('Please provide a valid manager. The session token might be invalid. Please try logging in again.')
        }

        try {
            data = await this
                        .service
                        .add(teamId, memberUsername, managerUsername)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Unexpected error adding "${memberUsername}" to the team. Details: ${error}`)
        }

        const response = data as OkPacketParams

        if (response.affectedRows && response.affectedRows > 0) {
            return {
                message: `"${memberUsername}" added to the team.`
            }
        } else {
            return {
                message: `Sorry we cannot add "${memberUsername}" to the team currently. Please try again in some time.`
            }
        }
    }

    async getMembersInATeam(teamId: number) {
        let data;

        if (teamId <= 0) {
            throw new ProjectManagementAppAPIError('Please provide a team id', 400)
        }

        try {
            data = await this
                        .service
                        .getMembersInATeam(teamId)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Unexpected error encountered while fetching members in the team. Please try again. Details: ${error}`)
        }

        const response = data as RowDataPacket

        if (response.length > 0) {
            return {
                teamMembers: response
            }
        } else {
            return {
                message: 'There are no members in this team currently.'
            }
        }
    }
}

export default TeamMembers;
