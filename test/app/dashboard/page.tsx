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
import React from 'react'
import { signOut } from 'next-auth/react'


export default function Home(){
  const { data: session, status } = useSession();
    return(
      <div id ="dashboard flex flex-row" >
        <div className="flex flex-col items-start  __sidebar max-w-[30%] float-left">
          <Image src={blackLogo} priority={true} className='mt-20 ml-24 ' alt={''} /> 
          <hr className='w-full mt-8 ml-24 opacity-[1] max-w-[30%]' />
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
          <div className='flex flex-row items-center mt-20 ml-24 __topbar'>
            <Image src={home} alt={''} />
            <span className='opacity-80 text-[1.7rem] tracking-wider font-medium ml-4 align-bottom inline-block mt-1' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}> / Dashboard</span>
          </div>
          <h1 className='opacity-100 text-[2.4rem] tracking-wider font-semibold ml-24 mt-8' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}>Welcome back, {session?.user.name}.</h1>
        </div>
      </div>
    )
  }

