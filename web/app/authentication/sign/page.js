"use context"

import Image from "next/image";

import whiteLogo from "../../../public/logo-white.svg"
import googlelogo from "../../../public/google-logo.svg"
import githublogo from "../../../public/github-logo.svg"


import { Card,Typography } from "@material-tailwind/react";



export default function Sign() {
    return (
        <div className = "w-screen h-screen overflow-hidden __sign" style={{backgroundColor: "#0A0A0A", fontFamily: "Inter, sans-serif"}}>
            <Image src={whiteLogo} alt="logo" priority={true} className='pt-20 pl-24'/>
            <hr className="mt-16 opacity-50" style={{color: "#888"}} />
             <Card color="transparent" shadow={false} className="flex items-center __signPane">
              <Typography variant="h4" className=" text-dark-primary text-[4.5rem] mb-[5rem] mt-44 tracking-wide">
                Sign in warp
              </Typography>
              <button className=" bg-dark-primary text-[3rem] flex items-center flex-row py-2 text-font-color rounded-2xl  __btn-google transition-all duration-200 hover:-translate-y-1">
                <span className="py-[0.8rem] pl-[5rem]"><Image src={ googlelogo } width={25} height={25} /></span>
                <span className="ml-[0.8rem] text-[1.8rem] font-medium pr-[5rem] antialiased tracking-wider">Continue with Google</span>
              </button>
              <button className=" text-[3rem] flex items-center flex-row py-2 text-font-color rounded-2xl __btn-google mt-6  border-dark-secondary hover:-translate-y-1 bg-[#24292E] transition-all duration-300 hover:bg-[#555]">
                <span className="py-[0.8rem] pl-[5rem]"><Image src={ githublogo } width={25} height={25} /></span>
                <span className="ml-[0.8rem] text-[1.8rem] font-medium pr-[5rem] text-dark-primary antialiased tracking-wider">Continue with GitHub</span>
              </button>
              <h1 className="text-[3rem] text-dark-primary mt-24 font-medium antialiased tracking-wider" >OR</h1>
              <h1 className="text-[2rem] text-dark-primary mt-20 font-medium antialiased tracking-wide" >nothing. email credentials aren't secure.</h1>
          </Card>
        </div>
    );
}