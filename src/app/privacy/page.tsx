import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { H1 } from "@/components/ui/H1";

import Image from "next/image";
// assets
import portrait from "@/assets/portrait.png"

export const metadata: Metadata = {
  title: "Privacy Policy"
}

export default function Home() {
  return <>
    <section className="flex min-h-screen p-16 space-y-16">
      <H1 className="uppercase">Privacy</H1>

    </section>
  </>
}
