import Link from "next/link";

export default function Footer() {
  return <footer className="sticky bottom-0 bg-background">
    <div className="mx-auto flex flex-wrap gap-3 px-3 py-4">
      <Link href="/privacy">Privacy</Link>
    </div>
  </footer>
}