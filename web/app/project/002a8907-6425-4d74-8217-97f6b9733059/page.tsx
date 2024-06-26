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
import cursor from "../../../public/cursor.svg"
import grab from "../../../public/grab.svg"
import typography from "../../../public/Typography.svg"
import utils from "../../../public/utils.svg"
import { toast } from "sonner"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ContextMenuSubContent } from '@radix-ui/react-context-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import close from "../../../public/close-icon.svg"
import interact from 'interactjs'
import { useRouter } from 'next/navigation'
import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { memo } from "react"

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
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
  const { isDraggable, show, setIsDraggable, toggleDraggable, toggleShow } = useDraggableContext();
  const [id, setId] = useState('');

  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);

  const setTextSmall = () => {
  console.log("Small");
  }
  
  const detectID = (event) => {
    let element = event.target;

    if (isDraggable === false && !element.classList.contains('not-selectable')) {
      let idEl = event.target.id;
      if (idEl) {
        setId(idEl);
        setIsSelected(!isSelected)
        console.log(isSelected);
        console.log(idEl);
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


  const [dropCoordinates, setDropCoordinates] = useState({ x: 0, y: 0 });
  const [dynamicContent, setDynamicContent] = useState([]);
  const surfaceRef = useRef(null);
  const [surfaceWidth, setSurfaceWidth] = useState(0);
  const [scale, setScale] = useState();
  const [positions, setPositions] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);


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
      item: { id: linkId }, 
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
            setMenuOpen(true);
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

const save = () => {
  const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 4000));

  toast.promise(promise, {
    loading: 'Loading...',
    success: (data) => {
      return `Content has been successfully saved.`;
    },
    error: (err) => {
      return 'Error';
    },
  });
}

const toggleDrag = () => {
toggleDraggable();
}

useEffect(() => {
  let actionInProgress = false;

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      if (!actionInProgress) {
        actionInProgress = true;
        save();
      }
    }
    else if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      if (typeof toggleShow === 'function' && !actionInProgress) {
      toggleShow();
      actionInProgress = true;
      }
    }
    else if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      if (typeof toggleShow === 'function' && !actionInProgress) {
      router.push("/dashboard")
      }
    }
    else if (e.ctrlKey && e.key === "g") {
      e.preventDefault();
      if (typeof toggleShow === 'function' && !actionInProgress) {
      toggleDrag();
      }
    }
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Control' || e.key === 's') {
      actionInProgress = false; 
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
  };
}, [toggleShow, toggleDraggable, router]);



  const handleEventPropagation = (event) => {
    event.stopPropagation();
  };

  const handleOpenMenu = (event) =>{
    event.stopPropagation();
    setDropdown(true);
  }

  return (
      <>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className='flex flex-row overflow-hidden'>
              <div className="toolbar flex flex-row w-fit bg-[#292929] w-[10vw]" style={{backgroundColor: "#292929"}}>
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
                        <div className='pt-6 ml-10 opacity-90'>
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
                                <div className="flex flex-col items-center justify-center h-16 pt-4 pr-4">
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
                        <div className='pt-6 ml-10 opacity-90'>
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
                                <div className="flex flex-col items-center justify-center h-16 pt-4 pr-4">
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
                          onDragEnd={(pos) => handleDragEnd( `draggable-${content.id}` , pos)}>
                        <DynamicComponent {...content} id={`draggable-${content.id}`} />
                      </Draggable>
                    ))}  
              <Typography variant = "undefined" className="tracking-wider absolute ---warp-dev-paragraph draggable z-[999]">lorem ipsum dolor sit amet</Typography>
            </div>
                </TargetSurface>
              </div>
            </ContextMenuTrigger>
            <ContextMenuPortal>
            <ContextMenuContent
              className="min-w-[18rem] bg-[#fdfdff] rounded-lg overflow-hidden p-[0.5rem] shadow-lg border-solid border-[0.1rem] border-[#CCCCCC] border-opacity-60"
              sideOffset={5}
              align="end"
            >
              <ContextMenuLabel className={`pl-[2.3rem] text-[1.25rem] leading-[25px] tracking-wide ${inter.className} font-medium text-[#333] opacity-80`}>
                General
              </ContextMenuLabel>
              <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className}`} onClick={()=> router.push("/dashboard")}>
                Back{' '}
                <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-[#007BFF] group-data-[disabled]:text-mauve8 tracking-wider">
                  Ctrl+B
                </div>
              </ContextMenuItem>
              <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className}`} onClick={() => save()}>
                    Save{' '}
                <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-[#007BFF] group-data-[disabled]:text-mauve8 tracking-wider">
                  Ctrl+S
                </div>
              </ContextMenuItem>
              <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className} mb-2`} onClick={()=>location.reload()}>
                Reload{' '}
                <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-[#007BFF] group-data-[disabled]:text-mauve8 tracking-wider">
                  Ctrl+R
                </div>
              </ContextMenuItem>
                <ContextMenuSeparator className="h-[1px] bg-[#333333] bg-opacity-40 m-[5px]" />
                <ContextMenuLabel className={`pl-[25px] text-[1.25rem] leading-[25px] tracking-wide ${inter.className} font-medium text-[#333] opacity-80`}>
                Low-level
              </ContextMenuLabel>
                <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className}`} onClick={toggleDrag}>
                Change Mode{' '}
                <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-[#007BFF] group-data-[disabled]:text-mauve8 tracking-wider">
                  Ctrl+G
                </div>
              </ContextMenuItem>
                <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className}`} onClick={toggleShow}>
                Show Editor{' '}
                <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-[#007BFF] group-data-[disabled]:text-mauve8 tracking-wider">
                  Ctrl+E
                </div>
              </ContextMenuItem>
                <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className} mb-3`} onClick={toggleShow}>
                Toggle Pen{' '}
                <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-[#007BFF] group-data-[disabled]:text-mauve8 tracking-wider">
                  P
                </div>
              </ContextMenuItem>
              <ContextMenuSeparator className="h-[1px] bg-[#333333] bg-opacity-40 m-[5px]" />
              <ContextMenuSub>
                <ContextMenuSubTrigger className={`group text-[1.4rem] text-[#333333] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-[#333] data-[disabled]:pointer-events-none  data-[highlighted]:text-[#007BFF] data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 ${inter.className} mt-2 font-normal`}>
                  More
                </ContextMenuSubTrigger>
                <ContextMenuPortal>
                  <ContextMenuSubContent
                  className="min-w-[18rem] bg-[#fdfdff] rounded-lg overflow-hidden p-[0.5rem] shadow-lg border-solid border-[0.1rem] border-[#CCCCCC] border-opacity-60"
                  sideOffset={10}
                  alignOffset={-5}
                  >
                    <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className} hover:cursor-pointer`} onClick={() => { setDialogOpen(true); console.log('Opening dialog'); }}>
                    Share{' '}
                    </ContextMenuItem>
                    <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className} hover:cursor-pointer`}>
                    Export Code{' '}
                    </ContextMenuItem>
                    <ContextMenuItem className={`group text-[1.4rem] leading-none text-[#333333] rounded-[0.3rem] flex items-center h-[2.5rem] px-[0.5rem] relative pl-[2.5rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-[#007BFF] tracking-wider ${inter.className} hover:cursor-pointer`}>
                    View Full{' '}
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuPortal>
              </ContextMenuSub>
            </ContextMenuContent>
            </ContextMenuPortal>
          </ContextMenu>
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild />
            <AlertDialogPortal>
                <AlertDialogOverlay className="bg-[#efefef] bg-opacity-[0.1] data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialogContent className={`data-[state=open]:animate-contentShow fixed top-[25%] left-[50%] max-h-[85vh] w-[90vw] max-w-[350px] translate-x-[-50%] translate-y-[-80%] rounded-sm bg-white p-[25px] focus:outline-none tracking-wide ${inter.className} leading-[2.5rem]`} style={{borderRadius:"2px"}}>
                    <p className='absolute left-0 ml-6 text-[1.3rem] mt-3'>Share project</p>
                    <Image src={close} alt="Close" width={14} height={14} className='absolute right-0 mt-5 mr-6 cursor-pointer' onClick={() => setDialogOpen(false)} />
                </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
          <Draggable
            id="menu"
            onDragEnd={(pos) => handleDragEnd( `menu` , pos)}
            initialX={0}
            initialY={0}
          >
            <div className='menu absolute top-[50%] right-[50%] z-[99999] bg-[#333] flex flex-row text-[2rem] h-16 items-center' style={{fontSize:"10.5rem"}} id = "menu">
              <Menubar className={`bg-[#333] border-none h-full ${inter.className} tracking-wide text-[#efefef] menu-div`}>
                <MenubarMenu>
                  <MenubarTrigger className='text-[1.5rem] h-full'>Size</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem className="text-2xl" onClick={setTextSmall}>
                      Small <MenubarShortcut className='text-[1.2rem] tracking-wide'>15px</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem className='text-3xl'>
                      Md <MenubarShortcut className='text-[1.2rem] tracking-wide'>18.75px</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem className='text-4xl'>
                      Lg <MenubarShortcut className='text-[1.2rem] tracking-wide'>22.5px</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger className='text-[1.2rem]'>Custom</MenubarSubTrigger>
                      <MenubarSubContent className='w-[70%] hover:bg-none'>
                        <MenubarItem
                          onClick={handleEventPropagation}
                          onFocus={handleEventPropagation}
                          className='px-0 py-0 hover:bg-none w-[100%]'
                        >
                          <input
                          onClick={handleEventPropagation}
                          onFocus={handleEventPropagation}
                          onMouseMove={handleEventPropagation}
                          className={`h-full w-[55%] border-solid border-[0.1rem] focus:outline-none border-black px-0 py-0 mx-0 my-0 inline-block text-[1.2rem] tracking-wide ${inter.className}`}
                          maxLength={3}
                          ></input>
                          <div className='flex flex-row justify-end'>
                            <svg
                            onClick={handleOpenMenu}
                            onFocus={handleEventPropagation}
                            className='absolute right-1 top-0 bottom-[50%]'
                            width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                          </div>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <ToggleGroup type="multiple" className='h-full gap-0 ml-4'>
                <ToggleGroupItem value="bold" className="hover:bg-[#888] data-[state=on]:bg-[#888] rounded-none h-full w-full" aria-label="Toggle bold">
                  <Bold className="w-10 h-10" color="#efefef" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" className="hover:bg-[#888] data-[state=on]:bg-[#888] rounded-none h-full"  aria-label="Toggle italic">
                  <Italic className="w-10 h-10" color="#efefef" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" className="hover:bg-[#888] data-[state=on]:bg-[#888] rounded-none h-full" aria-label="Toggle underline">
                  <Underline className="w-10 h-10" color="#efefef" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Draggable>
      </>
  );
}