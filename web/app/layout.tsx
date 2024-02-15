"use client"

import "../styles/globals.css"
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next';
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  )
}
