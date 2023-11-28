import { Pool } from "mysql2"
import pool from "./db"
import { IUsers } from '../interfaces'

class Users {
    private pool: Pool
    constructor() {
        this.pool = pool
    }
    register(user: IUsers) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                `insert into tbl_users set ?;`,
                {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    username: user.username,
                    password: user.password,
                    profession_id: user.professionId,
                    role_id: user.roleId,
                },
                (error, results, _fields) => {
                    if (error) reject(error)
                    if (results) resolve(results)
                }
            )
        })
    }

    getUserByUsername(username: string) {
        return new Promise((resolve, reject) => {
            this
            .pool
            .query(
                `select
                    u.id,
                    u.first_name,
                    u.last_name,
                    u.username,
                    u.password,
                    p.name as profession,
                    r.name as role
                from tbl_users as u
                inner join tbl_professions as p
                on u.profession_id = p.id
                inner join tbl_roles as r
                on u.role_id = r.id
                where u.username = ?
                `,
                [username],
                (error, results, _fields) => {
                    if (error) reject(error)
                    if (results) resolve(results)
                }
            )
        })
    }
}

export default Users
