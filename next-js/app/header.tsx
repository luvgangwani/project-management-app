import Link from "next/link";

function Header() {

    return (
    <header className="app-header">
      <span>Project Management App</span>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/api/auth/signout">Logout</Link>
      </nav>
    </header>
  );
}

export default Header;
