import { genSaltSync, hashSync } from 'bcrypt';
import { IUsers } from '../interfaces';
import UsersService from '../services/Users'

class Users {
    private service: UsersService;
    constructor() {
        this.service = new UsersService();
    }

    register(user: IUsers) {
        const salt = genSaltSync(10)

        // hash the password
        user.password = hashSync(user.password, salt)
        return this
        .service
        .register(user)
        .then(data => data)
        .catch(error => {
            throw new Error(`Error registering user: ${error}`)
        })
    }

    getUserByUsername(username: string) {
        return this
        .service
        .getUserByUsername(username)
        .then(data => data)
        .catch(error => {
            throw new Error(`Error fetching user: ${error}`)
        })
    }
}

export default Users;
