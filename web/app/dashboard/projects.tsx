import Role from "./label"
import { v4 } from "uuid"
import { useRouter } from 'next/navigation'
import { createFile } from "../../lib/gcp-create"

export default function Projects({role, session} : { role : string, session : any}) : JSX.Element{
    const router = useRouter();
    const createID = () : string => {
        const idProject : string = v4();
        createFile(idProject);
        return idProject;
    }

    const projectRouting = () : void =>{
        let id = createID();
        router.push(`/project/${id}`)
    }


    return(
        <div className="flex flex-row items-center justify-center ml-24 mt-80" style={{fontFamily:"Inter, sans-serif"}}><span className='text-[2.6rem] tracking-wider font-semibold text-font-color opacity-90 __username inline-block'>{session?.user?.name}'s websites</span>
        <Role role={role} />
        <a className="font-medium tracking-wider __create text-font-color text-[1.3rem] mr-0 ml-auto border-solid border-x-[0.1rem] border-y-[0.1rem] border-font-color rounded-xl hover:cursor-pointer hover:-translate-y-2 transition-all duration-200 "><span className="inline-block px-6 py-3" onClick={()=>projectRouting()}>CREATE NEW</span></a>
        </div>
    )
}