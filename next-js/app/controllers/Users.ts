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

        // check that the first name is provided
        if (!user.firstName)
            throw new ProjectManagementAppAPIError('Please provide first name.', 401)

        // check that the last name is provided
        if (!user.lastName)
            throw new ProjectManagementAppAPIError('Please provide last name.', 401)

        // check that the username is provided
        if (!user.username)
            throw new ProjectManagementAppAPIError('Please provide username.', 401)

        // check if password is provided
        if (!user.password)
            throw new ProjectManagementAppAPIError('Please provide a password.', 401)

        // check the password format
        const passwordRegEx = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,32}/gm)
        if (!passwordRegEx.test(user.password))
            throw new ProjectManagementAppAPIError('Password format seems to be incorrect. There should be at least 1 lowecase character, 1 uppercase character, 1 numeric value and 1 special character.', 401)
        else
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
            throw new ProjectManagementAppAPIError('Sorry, we are unable to register you at the moment. Please try again in some time.')
        }
    }

    async getUserByUsername(username: string) {
        let data
        
        if (!username)
            throw new ProjectManagementAppAPIError('Please provide a username.', 401)

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
    }

    async login(creds: ICreds) {
        let data
        // check password is provided
        // the assumption here is that username check will be a preliminary one before even hitting the login endpoint
        if (!creds.password) {
            throw new ProjectManagementAppAPIError(`Please provide a password.`, 401)
        }

        try {     
            data = await this
            .service
            .getUserByUsername(creds.username)
        } catch (error) {
            throw new ProjectManagementAppAPIError(`Error logging in: ${error}`)
        }

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
                    throw new ProjectManagementAppAPIError('Password does not match.', 403)
                }
            }
    }
}

export default Users;
