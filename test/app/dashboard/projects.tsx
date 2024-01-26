"use client"

import Role from "./label"

export default function Projects({id, role, session} : {id : number, role : string, session : any}){
    return(
        <div className="flex flex-row items-center ml-24 mt-80" style={{fontFamily:"Inter, sans-serif"}}><span className='text-[2.6rem] tracking-wider font-semibold text-font-color opacity-90 __username'>{session?.user?.name}'s websites</span>
        <Role role={role} />
        </div>
    )
}