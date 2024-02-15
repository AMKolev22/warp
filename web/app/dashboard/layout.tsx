import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Warp | Dashboard',
    icons: {
    icon: "/favicon-32x32.png",
  },
};

 
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
        <body>{children}</body>
    </html>
  )
}