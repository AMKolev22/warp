"use client"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableProvider } from './test/draggableContext';
import { Toaster } from "../../components/ui/sonner"
 

 
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
    <html lang="en">
    <DndProvider backend={HTML5Backend}>
      <DraggableProvider>
          <body>
            {children}
            <Toaster richColors />
            </body>
      </DraggableProvider>
    </DndProvider>
    </html>

  )
}