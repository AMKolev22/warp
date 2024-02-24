"use client"
import { Menu, Transition } from '@headlessui/react'
import { Fragment, use, useEffect, useRef, useState } from 'react'
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
import { Card, Typography } from '@material-tailwind/react'
import ChangeMode from "../test/page"
import CodeMirror from '@uiw/react-codemirror';
import Draggable from '../test/draggable'
import { useDraggableContext } from '../test/draggableContext'
import { sublime } from '@uiw/codemirror-theme-sublime';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import Link from 'next/link'
import divImg from "../../../public/log-in.svg"
import image from "../../../public/log-in.svg"
import videoImg from "../../../public/log-in.svg"
import interact from 'interactjs'
import cursor from "../../../public/cursor.svg"
import grab from "../../../public/grab.svg"
import typography from "../../../public/Typography.svg"
import utils from "../../../public/utils.svg"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const linkId = 'link-unique-id';
const headingId = 'heading-unique-id';
const paragraphId = 'paragraph-unique-id';
const COMPONENT_MAP = { Typography, Link, Card : "div", Image : "img" };

const DynamicComponent = ({ component, props, x, y, id }) => {
  const Component = COMPONENT_MAP[component];
  return (
      <>
        <Component {...props} style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }} id = {id} />
      </>
  );
};


export default function Canvas() {

  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const style = {
    border: '2px solid',
    borderColor: isSelected ? '#007BFF' : 'transparent',
    backgroundColor: isSelected ? '#E0F0FF' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const linkId = 'link-unique-id';
  const headingId = 'heading-unique-id';
  const paragraphId = 'paragraph-unique-id';
  const videoId = 'video-unique-id';
  const divId = 'div-unique-id';
  const imageId = 'image-unique-id';

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isDraggable, show, setIsDraggable, toggleDraggable } = useDraggableContext();
  const [id, setId] = useState('');

  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);


  const detectID = (event) => {
    let element = event.target;

    if (isDraggable === false && !element.classList.contains('not-selectable')) {
      let idEl = event.target.id;
      if (idEl) {
        setId(idEl);
        setIsSelected(!isSelected)
        console.log(isSelected);
        if (element.getAttribute('data-border-applied') === 'true') {
          element.removeAttribute('data-border-applied');
        } else {
          element.setAttribute('data-border-applied', 'true');
        }
      } else {
        console.log("This element does not have an ID.");
      }
    }
  };


  const ContextMenu = () => {

    const handleContextMenu = (event) => {
      event.preventDefault();
      const rec = event.target.getBoundingClientRect();
      setIsOpen(true); // Open the custom context menu
      setPosition({ x: rec.x, y: rec.y }); // Set the position of the menu
    };

    const handleClose = () => {
      setIsOpen(false); // Close the context menu
    };

    return (
        <div onContextMenu={handleContextMenu} onClick={handleClose} style={{ height: '100vh', position: 'relative' }}>
          {isOpen && (
              <Menu as="div" static className="menu-container" style={{ position: 'absolute', top: position.y, left: position.x }}>
                <Menu.Items className="menu-items">
                  {/* Example menu item */}
                  <Menu.Item>
                    {({ active }) => (
                        <button className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                          Option 1
                        </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
          )}
        </div>
    );
  };

  const [dropCoordinates, setDropCoordinates] = useState({ x: 0, y: 0 });
  const [dynamicContent, setDynamicContent] = useState([]);
  const surfaceRef = useRef(null);
  const [surfaceWidth, setSurfaceWidth] = useState(0);
  const [scale, setScale] = useState();
  const [positions, setPositions] = useState({});


  const ParagraphComponent = ({children}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'DRAGGABLE_TYPE',
      item: { id: paragraphId },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return <div ref={drag} className={isDragging ? 'dragging' : ''}>{children}</div>;
  };
  const DivComponent = ({children}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'DRAGGABLE_TYPE',
      item: { id: divId },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return <div ref={drag} className={isDragging ? 'dragging' : ''}>{children}</div>;
  };
  const ImageComponent = ({children}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'DRAGGABLE_TYPE',
      item: { id: imageId },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return <div ref={drag} className={isDragging ? 'dragging' : ''}>{children}</div>;
  };
  const VideoComponent = ({children}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'DRAGGABLE_TYPE',
      item: { id: videoId },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return <div ref={drag} className={isDragging ? 'dragging' : ''}>{children}</div>;
  };

  const HeadingComponent = ({children}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'DRAGGABLE_TYPE',
      item: { id: headingId },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return <div ref={drag} className={isDragging ? 'dragging' : ''}>{children}</div>;
  };


  const LinkComponent = ({children}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'DRAGGABLE_TYPE',
      item: { id: linkId }, // Include the type if needed
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return <div ref={drag} className={isDragging ? 'dragging' : ''}>{children}</div>;
  };



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
    const handleDragEnd = (id, position) => {
      setPositions(prev => ({ ...prev, [id]: position }));
    };

    const handleDrop = (item: any, monitor: any) => {
      const newDropCoordinates = monitor.getClientOffset();
      const delta = monitor.getDifferenceFromInitialOffset();
      console.log(item.id)
      if (surfaceRef.current) {
        const surfaceRect = surfaceRef.current.getBoundingClientRect();
        const relativeCoordinates = calculateRelativeCoordinates(newDropCoordinates, surfaceRect);
        if (delta) {
          if (item.id === 'heading-unique-id'){
            updateDynamicContent('add', {
              component: 'Typography',
              props: {
                className: `tracking-wider absolute ---warp-dev-heading draggable z-[999]`,
                variant: "h1",
                children: "lorem ipsum dolor sit amet",
              },
              x: relativeCoordinates.x,
              y: relativeCoordinates.y,
            });
          }

          else if (item.id == 'link-unique-id'){
            updateDynamicContent('add', {
              component: 'Link',
              props: {
                className: `tracking-wider absolute ---warp-dev-link draggable z-[999]`,
                children: "lorem ipsum dolor sit amet",
                href: "/",
              },
              x: relativeCoordinates.x,
              y: relativeCoordinates.y,
            });

          }


          else if (item.id == "paragraph-unique-id"){
            updateDynamicContent('add', {
              component: 'Typography',
              props: {
                className: `tracking-wider absolute ---warp-dev-paragraph draggable z-[999]`,
                children: "lorem ipsum dolor sit amet",
              },
              x: relativeCoordinates.x,
              y: relativeCoordinates.y,
            });
          }
          else if (item.id == "div-unique-id"){
            updateDynamicContent('add', {
              component: 'Card',
              props: {
                width: "20rem",
                height: "20rem",
                className: `tracking-wider absolute ---warp-dev-div draggable z-[999] w-[${width}rem] h-[${height}rem] bg-[#efefef]`,
                children: "lorem ipsum dolor sit amet",
              },
              x: relativeCoordinates.x,
              y: relativeCoordinates.y,
            });
          }
          else if (item.id == "image-unique-id"){
            updateDynamicContent('add', {
              component: 'Image',
              props: {
                className: `tracking-wider absolute ---warp-dev-image draggable z-[999] w-[4rem] h-[4rem]`,
                src: "/logo-black.svg",
              },
              x: relativeCoordinates.x,
              y: relativeCoordinates.y,
            });
          }

        }

        const newSurfaceWidth = calculateSurfaceWidth(surfaceRef);

        setDropCoordinates(newDropCoordinates);
        setSurfaceWidth(newSurfaceWidth);
        const newScale = document.body.clientWidth / newSurfaceWidth;
        setScale(newScale);

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
        event.preventDefault();

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


  const Editor = ({ editorId }) => {
    console.log(editorId);
    const [code, setCode] = useState('');

    editorId = editorId.replace('draggable-', '');

    useEffect(() => {
      const storedCodeArray = JSON.parse(localStorage.getItem('dynamicContent')) || [];
      const matchingCodeItem = storedCodeArray.find(item => item.id === editorId);

      if (matchingCodeItem && matchingCodeItem.props) {
        const propsJsonString = JSON.stringify(matchingCodeItem.props, null, 2);
        setCode(propsJsonString);
      }
    }, [editorId]);

    const handleCodeChange = (value) => {
      try {
        const updatedProps = JSON.parse(value);

        const storedCodeArray = JSON.parse(localStorage.getItem('dynamicContent')) || [];
        const itemIndex = storedCodeArray.findIndex(item => item.id === editorId);

        if (itemIndex !== -1) {
          storedCodeArray[itemIndex].props = updatedProps;
          localStorage.setItem('dynamicContent', JSON.stringify(storedCodeArray));
        }
        setCode(value);
      } catch (error) {
        console.error("Error parsing updated props JSON:", error);
      }
    };
    useEffect(() => {
      const element = document.getElementById(`draggable-${editorId}`);
      if (element) {
        try {
          const propsObj = JSON.parse(code);

          if (element.tagName.toLowerCase() === 'img') {
            if (propsObj.src !== undefined) {
              element.src = propsObj.src;
            }
            if (element.tagName.toLowerCase() === 'div') {

            }
          } else {
            if (propsObj.children) {
              element.innerHTML = propsObj.children;
            }

            if (propsObj.className !== undefined) {
              element.className = propsObj.className;
            }
          }

        } catch (error) {
          console.error("Error updating element:", error);
        }
      }
    }, [code, editorId]);

    return (
        <Draggable
            id="editor"
            onDragEnd={(pos) => handleDragEnd( `editor` , pos)}
            initialX={0}
            initialY={0}
        >
          <CodeMirror
              value={code}
              id='editor'
              theme={sublime}
              height='500px'
              width='500px'
              className='absolute inline top-[20rem] right-[30rem] selection:bg-transparent overflow-hidden resize text-[1.4rem] z-[9] draggable drop-shadow-2xl rounded-xl shadow-lg'
              extensions={[
                javascript({ jsx: true }),
                EditorState.tabSize.of(2),
                EditorView.lineWrapping
              ]}
              onChange={(value, viewUpdate) => handleCodeChange(value)}
          />
        </Draggable>
    );
  };


  interact('.---warp-dev-div')
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            })

            Object.assign(event.target.dataset, { x, y })
          }
        }
      })
  interact('.---warp-dev-image')
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            })

            Object.assign(event.target.dataset, { x, y })
          }
        }
      })






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
            <div className='w-[12.5vw] font-semibold absolute bottom-0 left-0 right-0 z-[999] drop-shadow-xl bg-white -translate-y-14 rounded-xl h-[8rem] flex flex-row' style={{margin: "0 auto"}}>
              <div className='flex flex-col'>
                <div className=' inline-block w-fit rounded-tl-xl border-solid border-black border-opacity-40 border-r-[0.1rem] hover:bg-[#888] hover:bg-opacity-15' onClick={setIsDraggable}>
                  <span><Image src={grab} width={44} height={40} alt={''} /> </span>
                </div>
                <div className='rounded-bl-xl inline-block w-fit border-r-[0.1rem] border-black border-opacity-40 border-solid hover:bg-[#888] hover:bg-opacity-15' >
                  <span><Image src={cursor} width={44} height={40} alt={''} /> </span>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className={` ${inter.className} inline-flex w-full justify-center rounded-lg px-2 py-2 text-3xl font-normal text-[#efefef] focus:outline-none focus-visible:ring-2`}>
                    <div className='ml-10 opacity-90 pt-6'>
                      <Image src={typography} width={45} alt={''} />
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
                  <Menu.Items className="absolute left-0 top-0 -ml-40 mb-12 -mt-16 w-48 rounded-md bg-[#404040] shadow-lg focus:outline-none">
                    <ParagraphComponent>
                      <Menu.Item>
                        {({ active }) => (
                            <div className="flex flex-col items-center justify-center pr-8 h-16 border-solid border-[#888] border-b-[0.1rem]">
                              <div className="image-container">
                                <Image src={paragraph} alt="Link Image" width={38}  />
                              </div>
                            </div>
                        )}
                      </Menu.Item>
                    </ParagraphComponent>
                    <HeadingComponent>
                      <Menu.Item >
                        {({ active }) => (
                            <div className="flex flex-col items-center justify-center pr-4 h-16 pt-4">
                              <div className="image-container">
                                <Image src={heading} alt="Link Image" width={38}  />
                              </div>
                            </div>
                        )}
                      </Menu.Item>
                    </HeadingComponent>
                    <LinkComponent>
                      <Menu.Item className = "block mt-2">
                        {({ active }) => (
                            <div className="flex flex-col items-center justify-center pr-4 h-16 py-8 border-solid border-[#888] border-t-[0.1rem]">
                              <div className="image-container">
                                <Image src={link} alt="Link Image" width={38}  />
                              </div>
                            </div>
                        )}
                      </Menu.Item>
                    </LinkComponent>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className={` ${inter.className} inline-flex w-full justify-center rounded-lg px-2 py-2 text-3xl font-normal text-[#efefef] focus:outline-none focus-visible:ring-2`}>
                    <div className='ml-10 opacity-90 pt-6'>
                      <Image src={utils} width={45} alt={''} />
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
                  <Menu.Items className="absolute right-0 top-0 -mr-52 mb-12 -mt-16 w-48 rounded-md bg-[#404040] shadow-lg focus:outline-none">
                    <DivComponent>
                      <Menu.Item>
                        {({ active }) => (
                            <div className="flex flex-col items-center justify-center pr-8 h-16 border-solid border-[#888] border-b-[0.1rem]">
                              <div className="image-container">
                                <Image src={divImg} alt="Link Image" width={38}  />
                              </div>
                            </div>
                        )}
                      </Menu.Item>
                    </DivComponent>
                    <ImageComponent>
                      <Menu.Item >
                        {({ active }) => (
                            <div className="flex flex-col items-center justify-center pr-4 h-16 pt-4">
                              <div className="image-container">
                                <Image src={image} alt="Link Image" width={38}  />
                              </div>
                            </div>
                        )}
                      </Menu.Item>
                    </ImageComponent>
                    <VideoComponent>
                      <Menu.Item className = "block mt-2">
                        {({ active }) => (
                            <div className="flex flex-col items-center justify-center pr-4 h-16 py-8 border-solid border-[#888] border-t-[0.1rem]">
                              <div className="image-container">
                                <Image src={videoImg} alt="Link Image" width={38}  />
                              </div>
                            </div>
                        )}
                      </Menu.Item>
                    </VideoComponent>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <TargetSurface>
            <div className="canvas w-full h-screen relative bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" id="canvas" ref={surfaceRef} onClick={detectID}>
              <ChangeMode />
              {show == true && (
                  <Editor editorId={id} key={id} />
              )}
              {dynamicContent.map((content) => (
                  <Draggable
                      key={content.id}
                      id={`draggable-${content.id}`}
                      initialX={positions[content.id]?.x || 0}
                      initialY={positions[content.id]?.y || 0}
                      onDragEnd={(pos) => handleDragEnd( `draggable-${content.id}` , pos)}
                  >
                    <DynamicComponent {...content} id={`draggable-${content.id}`} />

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
