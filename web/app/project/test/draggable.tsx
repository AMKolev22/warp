import React, { createContext } from 'react';
import { Fragment, useEffect, useRef, useState, useContext } from 'react'
import interact from 'interactjs'
import { useDraggableContext } from './draggableContext';
"use client"



export default function Draggable({ children, onDragEnd, id, initialX = 0, initialY = 0 }) {
 const { isDraggable } = useDraggableContext();
  useEffect(() => {
    if (!isDraggable) {
      return; // Exit if dragging is not enabled
    }

    const interactable = interact(`#${id}`)
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            console.log(isDraggable);

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end(event) {
            const target = event.target;
            const x = parseFloat(target.getAttribute('data-x')) || 0;
            const y = parseFloat(target.getAttribute('data-y')) || 0;

            // Use these values for the transform to maintain the position
            target.style.transform = `translate(${x}px, ${y}px)`;
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

  }, [onDragEnd, id, initialX, initialY, isDraggable]);
  return <>{children}</>;
}

const handleDragEnd = (id, { x, y }) => {
  setPositions(prevPositions => ({
    ...prevPositions,
    [id]: { x, y },
  }));
};

