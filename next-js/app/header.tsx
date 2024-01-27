import Link from "next/link";
import { getAuthUser } from "./util";

async function Header() {

  const authUser = await getAuthUser()

  return (
    <header className="app-header">
      <span>Project Management App</span>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/teams">Teams</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href={"/profile"}>{ authUser?.fullName }</Link>
      </nav>
    </header>
  );
}

export default Header;
