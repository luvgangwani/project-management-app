import ProjectsService from "@/app/services/Projects";
import { IProjects } from "../interfaces";
import ProjectManagementAppAPIError from "../errors/ProjectManagementAppAPIError";
import { OkPacketParams, RowDataPacket } from "mysql2";

class Projects {
  private service: ProjectsService;
  constructor() {
    this.service = new ProjectsService();
  }

  async create(project: IProjects) {
    if (!project.name) {
      throw new ProjectManagementAppAPIError(
        "Please provide a project name!",
        400
      );
    }

    let data;

    try {
      data = await this.service.create(project);
    } catch (error) {
        throw new ProjectManagementAppAPIError(`Error creating a new project: ${error}`)
    }

    const response = data as OkPacketParams

    if (response.insertId) {
        return {
            message: `Project "${project.name}" created successfully.`
        }
    } else {
        throw new ProjectManagementAppAPIError('Sorry, we are unable to create a new team currently. Please try again in some time.')
    }
  }

  async getProjectsByUsername(username: string) {
    if (!username) {
      throw new ProjectManagementAppAPIError('Username not provided. Please provide one.', 400)
    }

    let data;

    try {
      data = await this
              .service
              .getProjectsByUsername(username)
    } catch (error) {
      throw new ProjectManagementAppAPIError(`Unexpected error loading projects. Please try again later. Details: ${error}`)
    }

    const response = data as RowDataPacket

    if (response.length > 0) {
      return {
        projects: response
      }
    } else {
      return {
        message: 'You have not created any projects.'
      }
    }
  }
}

export default Projects;
