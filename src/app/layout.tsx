import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template: "%s | Page title",
    default: "Home | Page title"
  },
  description: "Portfolio build with Next.js Typescript Tailwind.css Langchain.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
