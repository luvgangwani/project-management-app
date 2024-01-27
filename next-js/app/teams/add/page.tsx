import withAuthorize from '@/app/hoc/withAuthorize'
import styles from './page.module.css'


function TeamAddForm() {
  return (
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

export default withAuthorize(TeamAddForm)
