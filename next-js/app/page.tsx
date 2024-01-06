import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <header>Project Management App</header>
      <Link href="/api/auth/signout">Logout</Link>
    </main>
  )
}
