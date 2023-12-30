export interface IUsers {
    id?: number,
    firstName: string,
    lastName: string,
    username: string,
    password?: string,
    professionId?: number,
    roleId: number,
    created?: string,
    updated?: string,
}

export interface ITeams {
    id?: number,
    name: string,
    description: string,
    managerUsername?: string | null,
    created?: string,
    updated?: string,
}

export interface ICreds {
    username: string,
    password: string
}

export interface IAuth {
    token: string | null,
}

export interface IProjects {
    id?: number,
    name: string,
    managerUsername?: string | null,
    created?: string,
    update?: string,
}

export interface ITasks {
    id?: number,
    name: string,
    description?: string,
    statusId: number,
    storyPoints?: number,
    typeId: number,
    projectId: number,
    assigneeUsername: string,
    reporterUsername: string,
    created?: string,
    updated?: string,
}

export interface ITeamMembers {
    teamId: number,
    memberUsername: string,
    managerUsername: string,
    created?: string,
    updated?: string,
}

export interface IProjectAccess {
    projectId: number,
    teamId: number,
    adminUsername?: string | null,
    created?: string,
    updated?: string
}
