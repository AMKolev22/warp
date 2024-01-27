"use client"

import Role from "./label"

export default function Projects({id, role, session} : {id : number, role : string, session : any}){
    return(
        <div className="flex flex-row items-center ml-24 mt-80" style={{fontFamily:"Inter, sans-serif"}}><span className='text-[2.6rem] tracking-wider font-semibold text-font-color opacity-90 __username'>{session?.user?.name}'s websites</span>
        <Role role={role} />
        <a className="font-medium tracking-wider __create text-font-color text-[1.3rem] mr-0 ml-auto border-solid border-x-[0.1rem] border-y-[0.1rem] border-font-color rounded-xl mt-10 hover:cursor-pointer hover:-translate-y-2 transition-all duration-200"><span className="inline-block px-6 py-3">CREATE NEW</span></a>
        </div>
    )
}