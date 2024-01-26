"use client"

import "../styles/globals.css"
import { SessionProvider } from "next-auth/react";


// export async function getServerSideProps(context) {
//     const session = await getServerSession({ req: context.req });
//     return {
//         props: { session }
//     };
// }

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>{children}</body>
      </SessionProvider>
    </html>
  )
}
