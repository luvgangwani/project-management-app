import ProjectsService from "@/app/services/Projects";
import { IProjects } from "../interfaces";
import ProjectManagementAppAPIError from "../errors/ProjectManagementAppAPIError";
import { OkPacketParams } from "mysql2";

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
}

export default Projects;
