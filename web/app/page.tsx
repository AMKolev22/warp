"use client"

import Image from 'next/image'

import whitelogo from "../public/logo-white.svg"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Inter, Work_Sans } from 'next/font/google'
import { useEffect, useState } from 'react'
import { TypewriterEffectSmoothDemo } from '../components/ui/type'
import "../styles/globals.css"
import { MoveLeft } from 'lucide-react'
import "../styles/homepage.css"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const worksans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const TypingSimulator = ({ textToType, speed }: { textToType: string, speed: number }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setTypedText((prevTypedText) => prevTypedText + textToType[currentIndex]);
      currentIndex++;

      if (currentIndex === textToType.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [textToType, speed]);

  return (  
    <div className="typing-container text-[#efefef]">
      <div className="typed-text">{typedText}</div>
      <div className="cursor" />
    </div>
  );
};


export default function Home(){
  console.log(process.cwd());
  return(
    <div className = {`${"__home overflow-y-visible overflow-x-hidden bg-[#000] w-screen h-screen box-border"}`}>
      <div className="sticky top-0 nav">
        <div className = "flex flex-row items-center pl-20 pr-20 antialiased __navbar min-h-[15vh] w-full box-border">
          <Image src={whitelogo} alt="" width={140} />
          <div className='btn text-[0.9rem] font-medium tracking-wider text-[#efefef] ml-auto mr-0 min-h-[15vh] flex flex-row items-center gap-8'>
            <a className={`${inter.className} transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer selection:bg-transparent`}>Contact</a>
            <a className="rounded-xl border-opacity-70 text-opacity-90 inline-block font-semibold bg-[#efefef] bg-opacity-95 text-[#121212] transition-all duration-200 hover:-translate-y-1"><span className={` py-[0.4rem] px-[1.8rem] inline-block ${inter.className} hover:cursor-pointer selection:bg-transparent`}>Log In</span></a>
            <a className="border-solid border-x-[0.1rem] border-y-[0.1rem] border-[#efefef] rounded-xl border-opacity-70 text-opacity-90 inline-block font-semibold transition-all duration-200 hover:-translate-y-1"><span className={` py-[0.4rem] px-[1.8rem] inline-block ${inter.className} hover:cursor-pointer selection:bg-transparent`}>Sign Up</span></a>
          </div>
        </div>
        <hr className='bg-[#efefef] opacity-50 -mt-10'/>
        </div>
        <div id="first" className="absolute mt-56 flex flex-row flex-wrap items-center justify-center text-xl h-16 text-white">
  Generative AI, which gives you an overall score on your website.
</div>

          <div className="absolute ml-1 flex flex-row flex-wrap items-center justify-start text-3xl h-16">
        <TypewriterEffectSmoothDemo />
        </div>
    </div>
  )

}