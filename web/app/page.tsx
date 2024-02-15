"use client"

import Image from 'next/image'

import whitelogo from "../public/logo-white.svg"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Inter, Work_Sans } from 'next/font/google'
import { useEffect, useState } from 'react'
import "../styles/globals.css"

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
          <div className='btn text-[2rem] font-medium tracking-wider text-[#efefef] ml-auto mr-0 min-h-[15vh] flex flex-row items-center gap-8'>
            <a className={`${inter.className} transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer selection:bg-transparent`}>Contact</a>
            <a className="rounded-xl border-opacity-70 text-opacity-90 inline-block font-semibold bg-[#efefef] bg-opacity-95 text-[#121212] transition-all duration-200 hover:-translate-y-1"><span className={` py-[0.4rem] px-[1.8rem] inline-block ${inter.className} hover:cursor-pointer selection:bg-transparent`}>Log In</span></a>
            <a className="border-solid border-x-[0.1rem] border-y-[0.1rem] border-[#efefef] rounded-xl border-opacity-70 text-opacity-90 inline-block font-semibold transition-all duration-200 hover:-translate-y-1"><span className={` py-[0.4rem] px-[1.8rem] inline-block ${inter.className} hover:cursor-pointer selection:bg-transparent`}>Sign Up</span></a>
          </div>
        </div>
        <hr className='bg-[#efefef] opacity-50 -mt-10'/>
        </div>
        <div className='flex flex-row items-center'>
        <TypingSimulator textToType="Imagine you could create a full-fledged website in a day." speed={100} />
        </div>
    </div>
  )

}

