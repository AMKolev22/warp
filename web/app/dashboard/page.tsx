"use client"

import Image from 'next/image'
import __Icon from "./icon-container"

import blackLogo from "../../public/logo-black.svg"
import home from "../../public/home.svg"
import issue from "../../public/issue.svg"
import question from "../../public/question.svg"
import rocket from "../../public/rocket.svg"
import logout from "../../public/log-out.svg"
import login from "../../public/log-in.svg"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import ProjectArea from './projects'
import Project from "./project-component"

import "../../styles/typing.css"
import { Inter, Work_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const worksans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const Typewriter = ({ text, speed } : {text : string, speed : number}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
  let intervalId;

  if (currentIndex < text.length) {
    intervalId = setInterval(() => {
      setDisplayText((prevText) => prevText + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);

      if (currentIndex === text.length - 1) {
        clearInterval(intervalId);
      }
    }, speed);
  }

  return () => clearInterval(intervalId);
}, [currentIndex, text, speed]);

  return <span id = "anim">{displayText}</span>;
};


export default function Home(){
  console.log(process.cwd());
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status == "unauthenticated"){
    router.push("/api/auth/signin");
  }
  else{
    return(
      <div id ={`dashboard flex flex-row ${inter.className}`} >
        <div className="flex flex-col items-start  __sidebar max-w-[30%] float-left">
          <Image src={blackLogo} priority={true} className='mt-20 ml-24 ' alt={''} /> 
          <hr className='w-full mt-8 ml-32 opacity-[1] max-w-[30%]' />
          <__Icon path={home} header="Dashboard" mt={3}/>
          <div className='mt-24 __account'>
            <p className='text-[1.7rem] ml-28 mb-6 opacity-80 font-medium' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}>ACCOUNT</p>
            <__Icon path={rocket} header="Sign Up" mt={0} />
            <__Icon path={login} header="Log In" mt={3} />
          </div>
          <div className='mt-24 __contact'>
            <p className='text-[1.7rem] ml-28 mb-6 opacity-80 font-medium' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}>CONTACT</p>
            <__Icon path={issue} header="Report Issue" mt={0} />
            <__Icon path={question} header="Support" mt={3} />
          </div>
          <video autoPlay loop muted className='ml-24 mt-36 rounded-xl' width={230} height={125}>
            <source src="/star-bg.mp4" type="video/mp4" />
          </video>
            <div className='flex flex-col justify-center items-center tracking-wider w-[23rem] h-[4rem] bg-white mt-20 ml-24 rounded-lg text-center text-[2rem] font-medium hover:cursor-pointer' style={{fontFamily:'Inter, sans-serif', color: "#121212"}} id = "cust-sh" onClick={()=> signOut({callbackUrl: "/api/auth/signin"})}>
              <span className='' id = "btn">Log Out</span>
            </div>
          <p className='mt-20 ml-28 font-semibold text-[1rem] tracking-wider opacity-80' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}> @2024 warp. All rights reserved.</p>
        </div>
        <div className='flex flex-col __panel w-[70%]'>
          <div className='flex flex-row items-center mt-20 ml-36 __topbar'>
            <Image src={home} alt={''} />
            <span className='opacity-80 text-[1.7rem] tracking-wider font-medium ml-4 align-bottom inline-block mt-1' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}> / Dashboard</span>
          </div>

          <div className='opacity-100 text-[2.4rem] tracking-wider font-semibold ml-36 mt-8' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}><Typewriter text={`Welcome back, ${session?.user?.name}.`} speed={50} /></div>
          <ProjectArea session={session} role = {"user"} />
        </div>
      </div>
    )
  }
}

