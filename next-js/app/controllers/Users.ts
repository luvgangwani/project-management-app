import { IUsers } from '../interfaces';
import UsersService from '../services/Users'

class Users {
    private service: UsersService;
    constructor() {
        this.service = new UsersService();
    }

    register(user: IUsers) {
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
