import Link from 'next/link';
import styles from './page.module.css';
import { getAuthUser } from '../util';
import { Role } from '../enums';

async function Teams() {

    const authUser = await getAuthUser()

  return (
      <>
        <div className={styles.header}>
            <span>Teams</span>
            {
                authUser?.role === Role.ADMIN
                ?
                <Link href="#">Add</Link>
                :
                <></>
            }
        </div>
      </>
  )
}

export default Teams