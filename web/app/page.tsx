"use client"

import Image from 'next/image'

import whitelogo from "../public/logo-white.svg"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Inter, Work_Sans } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "../components/ui/bg-beams"
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
      <BackgroundBeams />
    </div>
  )

}