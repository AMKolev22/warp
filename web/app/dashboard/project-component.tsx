import { useRouter } from 'next/navigation'
import snow from "../../public/Golden snow 2.svg"
import Image from 'next/image'
import { Inter } from "next/font/google"
import "../../styles/hover.css"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function ProjectsCard({projectID, session} : {projectID : any, session : any}) : JSX.Element{
    const router = useRouter();
    const routing = () => {
        router.push(`/project/${projectID}`);
    }
    return(
      <>
      <a onClick={()=>routing()} className = "__card">
        <div className="flex flex-col mt-24" style={{fontFamily:"Inter, sans-serif hover:cursor-pointer"}}>
        <Image src={snow} alt="bg" className="hover:cursor-pointer" />
            <div className="border-solid border-x-[0.1rem] border-y-[0.1rem] border-[#888] border-opacity-40 hover:cursor-pointer">
              <h1 className={`font-normal text-xl tracking-wider ${inter.className} py-3 ml-4`}><span className="bg-[#888] bg-opacity-30 py-1 px-4 hover:cursor-pointer">FREE TIER</span></h1>
            </div>
            <p className={`${inter.className} text-[#121212] text-[1.75rem] font-medium mt-3 tracking-wider hover:cursor-pointer`} onClick={()=>routing()}>{session?.user?.name}'s site</p>
            <p className={`${inter.className} text-[#121212] text-[1.15rem] font-medium mt-3 tracking-wider transition-200 hover:cursor-pointer __load`} onClick={()=>routing()}>LOAD</p>
        </div>
       </a>
       </>
    )
}