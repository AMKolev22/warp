"use client"
import React, { createContext } from 'react';
import { useState, useContext } from 'react'

const DraggableContext = createContext();

export function useDraggableContext() {
  return useContext(DraggableContext);
}

export const DraggableProvider = ({ children }) => {
  const [isDraggable, setIsDraggable] = useState(true);
  const [show, setShow] = useState(false);
  console.log(show);
  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };
  const toggleShow = () => {
    setShow(!show);
  }

  return (
    <DraggableContext.Provider value={{ isDraggable, toggleDraggable, show, toggleShow }}>
      {children}
    </DraggableContext.Provider>
  );
};