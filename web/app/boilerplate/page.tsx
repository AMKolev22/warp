"use client"
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import transparent from "../../../public/logo-transparent-white.svg"
import  Image  from 'next/image'
import { signOut } from 'next-auth/react'
import link from "../../../public/link.svg"
import heading from "../../../public/heading.svg"
import paragraph from "../../../public/paragraph.svg"
import { useDrag, useDrop } from 'react-dnd'
import React from 'react'
import "../../../styles/drag.css"
import { Typography } from '@material-tailwind/react'
import interact from 'interactjs'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


const COMPONENT_MAP = { Typography };

const DynamicComponent = ({ component, props, x, y }) => {
  const Component = COMPONENT_MAP[component];
  return (
    <>
      <Component {...props} style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }} />
    </>
  );
};

export default function Canvas() {  

    const [dropCoordinates, setDropCoordinates] = useState({ x: 0, y: 0 });
   const [dynamicContent, setDynamicContent] = useState([]);
    const surfaceRef = useRef(null);
    const [surfaceWidth, setSurfaceWidth] = useState(0);
    const [scale, setScale] = useState();

    const DraggableComponent = ({ children }: { children: React.ReactNode }) => {
      const [{ isDragging }, drag] = useDrag(() => ({
        type: 'DRAGGABLE_TYPE',
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

      return (
        <div ref={drag} className={isDragging ? 'dragging' : ''}>
          {children}
        </div>
      );
    };

const calculateRelativeCoordinates = (dropCoordinates: any, surfaceRect: any) => ({
  x: dropCoordinates.x - surfaceRect.left,
  y: dropCoordinates.y - surfaceRect.top,
});

const calculateSurfaceWidth = (surfaceRef: React.RefObject<HTMLDivElement>) =>
  surfaceRef.current?.clientWidth || 0;

const TargetSurface = ({ children }: { children: React.ReactNode }) => {
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  const [dropCoordinates, setDropCoordinates] = useState({ x: 0, y: 0 });
  const [surfaceWidth, setSurfaceWidth] = useState(0);
  const [scale, setScale] = useState<number | null>(null);

  const handleDrop = (item: any, monitor: any) => {
    const newDropCoordinates = monitor.getClientOffset();
    const delta = monitor.getDifferenceFromInitialOffset();
    if (surfaceRef.current) {
      const surfaceRect = surfaceRef.current.getBoundingClientRect();
      const relativeCoordinates = calculateRelativeCoordinates(newDropCoordinates, surfaceRect);
     if (delta) {
      updateDynamicContent('add', {
        component: 'Typography',
        props: {
          className: `tracking-wider absolute ---warp-dev-heading draggable top-[(${relativeCoordinates.y / 10})rem] left-[${relativeCoordinates.x / 10}rem]`,
          variant: "h1",
          children: "lorem ipsum dolor sit amet"
        },
        x: relativeCoordinates.x,
        y: relativeCoordinates.y,
      });
    }
      console.log('Drop Coordinates (relative to div):', relativeCoordinates);

      const newSurfaceWidth = calculateSurfaceWidth(surfaceRef);

      setDropCoordinates(newDropCoordinates);
      setSurfaceWidth(newSurfaceWidth);
      const newScale = document.body.clientWidth / newSurfaceWidth;
      setScale(newScale);

      console.log('Scale:', newScale);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DRAGGABLE_TYPE',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

 return (
      <div className="flex-grow h-screen" ref={node => surfaceRef.current = node}>
        {React.isValidElement(children) && React.cloneElement(children, { ref: drop })}
      </div>
    );
};

  useEffect(() => {
    localStorage.setItem('dynamicContent', JSON.stringify(dynamicContent));
  }, [dynamicContent]);

    useEffect(() => {
    const handleSaveShortcut = async (event) => {
      if (event.ctrlKey && event.key === 's') {
        // Prevent the browser's save dialog
        event.preventDefault();
        
        // Call your save function here
        console.log('Saving content...');
        await saveContent();
      }
    };

    window.addEventListener('keydown', handleSaveShortcut);

    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [dynamicContent]);

   const saveContent = async () => {
      let segments = window.location.href.split("/");
      let idproject = segments[segments.length - 1]
    try {
      const response = await fetch('/api/heading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: dynamicContent, id: idproject }),
      });

      if (response.ok) {
        console.log('Content saved successfully.');
      } else {
        console.error('Failed to save content.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };


  const updateDynamicContent = (action, content) => {
    setDynamicContent(prevContent => {
      switch (action) {
        case 'add':
          return [...prevContent, { ...content, id: `${prevContent.length}-${Date.now()}` }];

        case 'update':
          return prevContent.map(item => item.id === content.id ? { ...item, ...content } : item);

        case 'remove':
          return prevContent.filter(item => item.id !== content.id);

        default:
          console.error('Invalid action type');
          return prevContent;
      }
    });
  };


function Draggable ({children} : {children: React.ReactNode}){
    useEffect(() => {
      // Target elements with the class 'draggable' inside '.warp-dev-heading'
      interact('.canvas .draggable')
        .draggable({
          listeners: {
            move(event) {
              const target = event.target;
              // Calculate the new position of the element
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

              target.style.transform = `translate(${x}px, ${y}px)`;

              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
            }
          },
          inertia: true,
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ]
        });
    }, []);

    return (
      <>
        {children}
      </>
    );
  };


  

  return (
    <>
      <div className='flex flex-row'>
        <div className="toolbar flex flex-row w-fit bg-[#292929]" style={{backgroundColor: "#292929"}}>
          <div className='flex flex-col border-solid h-screen border-r-[0.1rem] border-[#888] border-opacity-50'>
            <div className=" ml-0 text-left">
              <Menu as="div" className="relative inline-block text-left">
                <div className='border-solid border-b-[0.1rem] border-[#888] rounded-xs border-opacity-60 z-[999]'>
                  <Menu.Button className={` ${inter.className} inline-flex w-full justify-center rounded-lg px-4 py-2 text-3xl font-normal text-[#efefef] focus:outline-none focus-visible:ring-2 z-[999]`}>
                    <Image src={transparent} alt="" width={30} className='opacity-70 rounded-lg z-[999]' />

                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-1 w-64 origin-top-right rounded-md bg-[#404040] shadow-lg focus:outline-none z-[999]">
                    <div className="px-0 py-0 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                          href='/dashboard'
                            className={`${
                              active ? 'bg-[#888] bg-opacity-30 text-[#efefef]' : 'text-[#efefef]'
                            } group flex w-full items-center rounded-md px-4 pr-8 py-4 text-3xl tracking-wider z-[]`}
                          >
                            {active ? (
                              <EditActiveIcon
                                className="mr-4 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <EditInactiveIcon
                                className="mr-4 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            Dashboard
                          </a>
                        )}
                      </Menu.Item>
                      </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className='bottom fixed bottom-0 left-0'>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className={` ${inter.className} inline-flex w-full justify-center rounded-lg px-2 py-2 text-3xl font-normal text-[#efefef] focus:outline-none focus-visible:ring-2`}>
                      <div className='ml-1 opacity-90 pt-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 bottom-0 ml-16 mb-12 mt-1 w-64 rounded-md bg-[#404040] shadow-lg focus:outline-none">
                      <div className="px-0 py-0 ">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                            onClick={()=> signOut({callbackUrl: "/api/auth/signin"})}
                              className={`${
                                active ? 'bg-[#888] bg-opacity-30 text-[#efefef]' : 'text-[#efefef]'
                              } group flex w-full items-center rounded-md px-4 pr-8 py-4 text-3xl tracking-wider`}
                            >
                              {active ? (
                                <EditActiveIcon
                                  className="mr-4 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EditInactiveIcon
                                  className="mr-4 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Sign Out
                            </a>
                          )}
                        </Menu.Item>
                        </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className='w-[15vw] font-semibold'><h1 className= {`text-[1.5rem] text-[#efefef] ${inter.className} tracking-wider mt-[3.2rem] border-solid border-r-[0.1rem] border-y-[0.1rem] border-[#888] border-opacity-50`}><span className="py-6 inline-block ml-4">Add</span></h1>
          <Menu as="div" className="relative inline-block text-left">
      <div className='border-solid border-r-[0.1rem] border-y-[0.1rem] border-[#888] border-opacity-50 w-[15vw]'>
        <div className="">
          <div className='text-left'>
            <Menu.Button className={` ${inter.className} inline-flex w-full rounded-lg px-2 py-2 text-3xl font-semibold text-[#efefef] focus:outline-none focus-visible:ring-2 `}>
              <div className='ml-1 opacity-100 pt-2 font-semibold'>
                <h1 className={`text-[1.5rem] text-[#efefef] ${inter.className} tracking-wider py-4`}>Typography</h1>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 bottom-0 -mb-40 w-[15vw] bg-[#292929] focus:outline-none flex flex-col pl-2 border-[#888] rounded-none">
              <div className="px-0 py-0 flex font-medium">
                    <DraggableComponent>
                      <Menu.Item>
                        {({ active }) => (
                          <div className="flex flex-col items-center justify-center mr-4">
                            <div className="image-container">
                                <Image src={paragraph} alt="Link Image" width={40}  />
                              </div>
                            <a
                              className={`${
                                active ? 'text-[#efefef]' : 'text-[#efefef]'
                              } group flex items-center rounded-md px-4 pr-4 py-4 text-[1.3rem] tracking-wider`}
                            >
                              Paragraph
                            </a>
                          </div>
                        )}
                      </Menu.Item>
                    </DraggableComponent>
                  <DraggableComponent>
                    <Menu.Item>
                      {({ active }) => (
                        <div className="flex flex-col items-center justify-center mr-4 -mt-4">
                          <div className="image-container">
                              <Image src={heading} alt="Link Image" width={40}  />
                            </div>
                          <a
                            className={`${
                              active ? 'text-[#efefef]' : 'text-[#efefef]'
                            } group flex items-center rounded-md px-4 py-4 text-[1.3rem] tracking-wider`}
                          >
                            Heading
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                  </DraggableComponent>
                  <DraggableComponent>
                    <Menu.Item>
                      {({ active }) => (
                        <div className="flex flex-col items-center justify-center">
                          <div className="image-container">
                            <Image src={link} alt="Link Image" width={40} />
                          </div>
                          <a
                            className={`${
                              active ? 'text-[#efefef]' : 'text-[#efefef]'
                            } group flex items-center rounded-md px-4 py-4 text-[1.3rem] tracking-wider`}
                          >
                            Text Link
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                  </DraggableComponent>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </div>
    </Menu>
    </div>
        </div>
        <TargetSurface> 
                  <div className="canvas bg-yellow-50 w-full h-screen relative" id="canvas" ref={surfaceRef}>
                    {dynamicContent.map((content) => (
                      <Draggable key={content.id}>
                        <DynamicComponent {...content} />
                      </Draggable>
                    ))}
                  </div>
          </TargetSurface>
        </div>
    </>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}
