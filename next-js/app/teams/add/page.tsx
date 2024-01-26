import { Role } from "@/app/enums"
import { getAuthUser } from "@/app/util"
import styles from './page.module.css'

async function TeamAddForm() {
    const authUser = await getAuthUser()
  return (
    (authUser?.role !== Role.ADMIN && authUser?.role !== Role.MANAGER)
    ?
    <div>You're not authorised to view this page.</div>
    :
    <div className={styles.container}>
        <div className={styles.header}>Add a new team</div>
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description"></textarea>
            <button type="submit" id="btnCreate">Create</button>
        </form>
    </div>
  )
}

export default TeamAddForm
