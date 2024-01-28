"use client";

import styles from './page.module.css'
import { useFormState } from 'react-dom';
import { createTeam } from '@/actions';

const initialState = {
  message: ''
}
function TeamAddForm() {
  const [state, formAction] = useFormState(createTeam, initialState)
  return (
    <div className={styles.container}>
        <div className={styles.header}>Add a new team</div>
        <form action={formAction}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" />
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description"></textarea>
            <button type="submit" id="btnCreate">Create</button>
        </form>
        <div className={styles.message}>{state.message}</div>
    </div>
  )
}

export default TeamAddForm // adding withAuthorize causes unexpected failures. Try setting this from the controller instead
