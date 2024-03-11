"use client"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
 

 
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
    <DndProvider backend={HTML5Backend}>
        <body>{children}</body>
    </DndProvider>
    </html>

  )
}