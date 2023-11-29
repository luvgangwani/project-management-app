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

export interface IUserExists {
    userExists: boolean,
    message?: string
}

export interface ICreds {
    username: string,
    password: string
}

export interface IAuth {
    token: string | null,
}