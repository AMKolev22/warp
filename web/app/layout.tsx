"use client"

import "../styles/globals.css"
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
      <SessionProvider>
        <body >{children}</body>
      </SessionProvider>
    </html>
  )
}
