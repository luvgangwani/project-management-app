import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./api/auth/[...nextauth]/auth-options";

async function Header() {
  const session = await getServerSession(authOptions);


  return (
    <header className="app-header">
      <span>Project Management App</span>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/teams">Teams</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/api/auth/signout">Logout</Link>
      </nav>
    </header>
  );
}

export default Header;
