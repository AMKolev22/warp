"use client"
import { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { useDraggableContext } from './draggableContext';


function useContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const openMenu = (x, y) => {
    setPosition({ x, y });
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  // Close menu on outside click or Escape key press
  useEffect(() => {
    const handleOutsideClick = (event) => {
      closeMenu();
    };

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return { isOpen, position, openMenu, closeMenu };
}
const ContextMenu = () => {
  const { isOpen, position, openMenu, closeMenu } = useContextMenu();
  const { toggleDraggable, toggleShow } = useDraggableContext();
  const handleContextMenu = (event) => {
    event.preventDefault(); 
    openMenu(event.clientX, event.clientY);
    event.stopPropagation(); 
  };
  return (
    <div onContextMenu={handleContextMenu} className="relative" style={{ height: '100vh' }}>
      {isOpen && (
        <Menu as="div" onContextMenu={handleContextMenu} className="absolute" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items static as="div" className="menu-items z-[999]">
            <Menu.Item>
                {({ active }) => (
                <button onClick={toggleDraggable}
                className={`${
                active ? 'bg-[#888] bg-opacity-30 text-[#efefef] z-[999]' : 'text-[#efefef] bg-[#292929]'
                } group flex w-full items-center rounded-md px-4 pr-8 py-4 text-3xl tracking-wider z-[999]`}>
                    Change Mode
                </button>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                <button onClick={toggleShow}
                className={`${
                active ? 'bg-[#888] bg-opacity-30 text-[#efefef] z-[999]' : 'text-[#efefef] bg-[#292929]'
                } group flex w-full items-center rounded-md px-4 pr-8 mt-2 py-4 text-3xl tracking-wider z-[999]`}>
                    Show Editor
                </button>
                )}
            </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
      )}
    </div>
  );
};

export default ContextMenu;
