"use server";

import TeamsController from "./app/controllers/Teams";
import ProjectManagementAppAPIError from "./app/errors/ProjectManagementAppAPIError";
import { ITeams } from "./app/interfaces";
import { getAuthUser } from "./app/util";

export async function createTeam(prev: { message: string, showError: boolean }, formData: FormData) {
    const teamsController = new TeamsController();

    const authUser = await getAuthUser();

    const team: ITeams = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        managerUsername: authUser?.username
    };
    try {
        const response = await teamsController.create(team)
        return {
            ...response,
            showError: false,
        }
    } catch (error) {
        const { message } = error as ProjectManagementAppAPIError
        return {
            message,
            showError: true
        }
    }
}