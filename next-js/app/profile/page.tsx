import Link from "next/link";
import UsersController from "../controllers/Users";
import ProjectManagementAppAPIError from "../errors/ProjectManagementAppAPIError";
import { IUsersView } from "../interfaces";
import { getAuthUser } from "../util";
import styles from './page.module.css';


const usersController = new UsersController()

let user: IUsersView;
let err: string;

async function Profile() {

  const authUser = await getAuthUser()

  // get user info using username
  try {
    user = await usersController.getUserByUsername(authUser?.username)
  } catch (error) {
    err = (error as ProjectManagementAppAPIError).message
  }

  return (
    <div className={styles.container}>
      <div className='page-header'>
        Profile
        <Link href={'/api/auth/signout'} className={styles.logout}>Logout</Link>
      </div>
      {
        (err)
        ?
        <div>{err}</div>
        :
        <>
          <div className={styles.item}>
            <span>First Name:</span>
            <span>{user.firstName}</span>
          </div>
          <div className={styles.item}>
            <span>Last Name:</span>
            <span>{user.lastName}</span>
          </div>
          <div className={styles.item}>
            <span>Username:</span>
            <span>{user.username}</span>
          </div>
          <div className={styles.item}>
            <span>Profession:</span>
            <span>{user.profession}</span>
          </div>
          <div className={styles.item}>
            <span>Role:</span>
            <span>{user.role}</span>
          </div>
          <div className={styles.item}>
            <span>Created on:</span>
            <span>{user.created?.toString()}</span>
          </div>
          <div className={styles.item}>
            <span>Last updated on:</span>
            <span>{user.updated?.toString()}</span>
          </div>
        </>
      }
    </div>
  )
}

export default Profile
