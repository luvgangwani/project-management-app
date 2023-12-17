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
    managerUsername: string,
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
    managerUsername: string,
    created?: string,
    update?: string,
}
