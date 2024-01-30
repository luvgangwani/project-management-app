"use client";

import styles from './page.module.css'
import { useFormState, useFormStatus } from 'react-dom';
import { createTeam } from '@/actions';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Role } from '@/app/enums';

const initialState = {
  message: '',
  showError: false,
}
function TeamAddForm() {
  const [state, formAction] = useFormState(createTeam, initialState)
  const { pending } = useFormStatus()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const _session = await getSession()
      setSession(_session)
    }
    fetchSession()
  }, [])
  
  return (
    (session?.user && (session?.user.role === Role.ADMIN || session.user.role === Role.MANAGER))
    ?
    <div className={styles.container}>
        <div className={styles.header}>Add a new team</div>
        <form action={formAction}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" />
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description"></textarea>
            <button type="submit" id="btnCreate">{ pending ? 'Creating...' : 'Create'}</button>
        </form>
        <div className={`message ${state.showError ? 'error' : 'success'}`}>{state.message}</div>
    </div>
    :
    <div>You do not have access to this page.</div>
  )
}

export default TeamAddForm
