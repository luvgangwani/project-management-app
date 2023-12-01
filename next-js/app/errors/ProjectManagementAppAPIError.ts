import { ProjectManagementAppAPIErrorOptions } from "./types";

class ProjectManagementAppAPIError extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'ProjectManagementAppAPIError'
        this.message = message
        this.statusCode = statusCode || 500
    }
}

export default ProjectManagementAppAPIError;
