"use client"
import React, { createContext } from 'react';
import { Fragment, useEffect, useRef, useState, useContext } from 'react'
import interact from 'interactjs'
import { useDraggableContext } from './draggableContext';




export default function Draggable({ children, onDragEnd, id, initialX = 0, initialY = 0 }) {
  const { isDraggable } = useDraggableContext();
  const [currentX, setCurrentX] = useState(initialX);
  const [currentY, setCurrentY] = useState(initialY);

  useEffect(() => {
    if (!isDraggable) {
      return; 
    }

    const interactable = interact(`#${id}`)
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            console.log(x)

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            const storedItem = localStorage.getItem(id);
            if (storedItem) {
              const parsedItem = JSON.parse(storedItem);
              setCurrentX(currentX + parsedItem.x);
              setCurrentY(currentY + parsedItem.y);
              parsedItem.x = currentX;
              parsedItem.y = currentY;
              localStorage.setItem(id, JSON.stringify(parsedItem));
            }
          },
          end(event) {
            const target = event.target;
            const x = parseFloat(target.getAttribute('data-x')) || 0;
            const y = parseFloat(target.getAttribute('data-y')) || 0;

            target.style.transform = `translate(${x}px, ${y}px)`;

            const storedItem = localStorage.getItem(id);
            if (storedItem) {
              const parsedItem = JSON.parse(storedItem);
              setCurrentX(currentX + parsedItem.x);
              setCurrentY(currentY + parsedItem.y);
              parsedItem.x = currentX;
              parsedItem.y = currentY;
              localStorage.setItem(id, JSON.stringify(parsedItem));
            }
          }
        },
        inertia: false,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      });

    const el = document.querySelector('.draggable');
    if (el) {
      el.style.transform = `translate(${initialX}px, ${initialY}px)`;
      el.setAttribute('data-x', initialX);
      el.setAttribute('data-y', initialY);
    }

    return () => interactable.unset();

  }, [onDragEnd, id, initialX, initialY, isDraggable, currentX, currentY]);
  return <>{children}</>;
}

const handleDragEnd = (id, { x, y }) => {
  setPositions(prevPositions => ({
    ...prevPositions,
    [id]: { x, y },
  }));
};

