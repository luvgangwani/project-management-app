import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken'
import { ICreds, IUsers } from '../interfaces';
import UsersService from '../services/Users'
import { RowDataPacket } from 'mysql2';


class Users {
    private service: UsersService;
    constructor() {
        this.service = new UsersService();
    }

    register(user: IUsers) {
        const salt = genSaltSync(10)

        // hash the password
        user.password = hashSync(user.password!, salt)
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

    login(creds: ICreds) {
        return this
        .getUserByUsername(creds.username)
        .then(data => {
            const userResponse = data as RowDataPacket
            if (userResponse.length === 1) {
                const fetchedUser = userResponse[0] as IUsers
                const comparisonResult = compareSync(creds.password, fetchedUser.password!)
                if (comparisonResult) {
                    // delete the password and tokenize the fetched user info
                    fetchedUser.password = undefined
                    const token = sign(fetchedUser, process.env.JWT_SECRET as Secret, {
                        expiresIn: '1h'
                    })
                    return {
                        token
                    }
                } else {
                    return {
                        token: null
                    }
                }
            }
        })
    }
}

export default Users;
