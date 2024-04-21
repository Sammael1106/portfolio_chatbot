import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return <header className="sticky top-0 bg-background">
    <div className="max-w-3xl mx-auto flex flex-wrap gap-3 px-3 py-4">
      <Link href="/">Home</Link>
      <Link href="about">About me</Link>
      <Link href="/">Github</Link>
    </div>
    <div>
      <ThemeToggle />
    </div>
  </header>
}