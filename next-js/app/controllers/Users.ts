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
        console.log(user)
        return this
        .service
        .register(user)
        .then(data => data)
        .catch(error => {
            throw new Error(`Error registering user: ${error}`)
        })
    }
}

export default Users;
