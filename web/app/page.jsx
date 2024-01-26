"use client"

import Image from 'next/image'
import blackLogo from "../public/logo-black.svg"

export default function Home(){
  return(
    <Image src={blackLogo} priority={true} className='' /> 
  )
}
