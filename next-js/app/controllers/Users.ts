import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken'
import { ICreds, IUsers } from '../interfaces';
import UsersService from '../services/Users'
import { OkPacketParams, RowDataPacket } from 'mysql2';
import ProjectManagementAppAPIError from '../errors/ProjectManagementAppAPIError';


class Users {
    private service: UsersService;
    constructor() {
        this.service = new UsersService();
    }

    async register(user: IUsers) {
        let data
        const salt = genSaltSync(10)

        // hash the password
        user.password = hashSync(user.password!, salt)

        try {
            data = await this
            .service
            .register(user)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Error registering user: ${error}`)
        }
        const response = data as OkPacketParams
        if (response.insertId) {
            return {
                message: `Congratulations ${user.firstName}! Your registration is complete.`
            }
        } else {
            throw new ProjectManagementAppAPIError('Sorry, we are unable to register you at the moment. Please try again in sometime.', 401)
        }
    }

    async getUserByUsername(username: string) {
        let data
        try {
            data = await this
                .service
                .getUserByUsername(username);
            } catch (error) {
                throw new ProjectManagementAppAPIError(`Error fetching user: ${error}`);
            }
            const response = data as RowDataPacket;
            if (response.length <= 0) {
                throw new ProjectManagementAppAPIError(`Sorry, we couldn't find a user with username "${username}".`, 404);
            }
            return response.length === 1 // since there's a unique key constraint on the DB field
                ;
    }

    login(creds: ICreds) {
        // check password is provided
        // the assumption here is that username check will be a preliminary one before even hitting the login endpoint

        // check for any password format restrictions
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
                        token: null,
                        // add a message saying login was unsuccesful
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
