import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken'
import { ICreds, IUsers } from '../interfaces';
import UsersService from '../services/Users'
import { OkPacketParams, RowDataPacket } from 'mysql2';


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
        .then(data => {
            const response = data as OkPacketParams
            if (response.insertId) {
                return {
                    message: `Congratulations ${user.firstName}! Your registration is complete.`
                }
            } else {
                throw new Error('Sorry, we are unable to register you at the moment. Please try again in sometime.')
            }
        })
        .catch(error => {
            throw new Error(`Error registering user: ${error}`)
        })
    }

    getUserByUsername(username: string) {
        return this
        .service
        .getUserByUsername(username)
        .then(data => {
            const response = data as RowDataPacket
            if (response.length <= 0) {
                return {
                    userExists: false,
                    message: `Sorry, we couldn't find a user with username "${username}".`
                }
            } else if (response.length === 1) {
                return {
                    userExists: true
                }
            }
        })
        .catch(error => {
            throw new Error(`Error fetching user: ${error}`)
        })
    }

    login(creds: ICreds) {
        return this
        .service
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
        .catch(error => {
            throw new Error(`Error logging in: ${error}`)
        })
    }
}

export default Users;
