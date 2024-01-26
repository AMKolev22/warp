"use client"

import Image from 'next/image'
import blackLogo from "../public/logo-black.svg"
import React from 'react'

export default function Home(){
  return(
    <Image src={blackLogo} priority={true} className='' alt={''} /> 
  )
}
