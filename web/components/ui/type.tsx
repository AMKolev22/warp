<<<<<<< HEAD
"use client";
import { TypewriterEffect } from "./typewriter-effect";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import {CardHoverEffectDemo} from "./hover"
=======
import { TypewriterEffect } from "./typewriter-effect";
import { useEffect } from 'react';
import { CardHoverEffectDemo } from "./hover";
>>>>>>> decf52d2baf58690ef6bfd9cf4c15a5c9ff86fce
import Footer from '../ui/footer';

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Imagine you could create a full-fledged website in a day.",
      className: "text-white whitespace-pre text-6xl",
    },
  ];

<<<<<<< HEAD
useEffect(() => {
  AOS.init();
  AOS.refresh();
}, []);

  return (
    <div className="flex flex-col items-center justify-center h-[50rem] ">
      <div className="mt-[230vh] flex flex-col items-center justify-center">
=======
  return (
    <div className="flex flex-col items-center justify-center h-[50rem] ">
      <div className="mt-[210vh] flex flex-col items-center justify-center">
>>>>>>> decf52d2baf58690ef6bfd9cf4c15a5c9ff86fce
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="overflow-y-auto max-h-[50rem] flex flex-col items-center justify-center"></div>
          <button className="w-32 h-10 rounded-xl bg-orange-400 text-black border border-black text-orange-300 text-sm mr-4 mb-8 bg-orange-400 bg-opacity-80">
            Coming
          </button>
          <p className="text-[#efefef] text-grey text-base mb-10 text-xl">
            Generative AI, which gives you an
          </p>
<<<<<<< HEAD
          <p className="text-neutral-600 dark:text-neutral-200 text-white text-base mb-10 text-xl ml-2" >
=======
          <p className="text-neutral-600 dark:text-neutral-200 text-white text-base mb-10 text-xl ml-2">
>>>>>>> decf52d2baf58690ef6bfd9cf4c15a5c9ff86fce
            overall score on your website.
          </p>
        </div>
        <div className="max-w-6xl">
          <TypewriterEffect words={words} />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        </div>
        <div className="max-w-4xl">
          <p className="text-neutral-600 text-grey text-base mb-10 text-2xl ml-8 text-center">
            Warp allows you to create a website, given any web technology - whether you’re experienced or not.{" "}
            <span className="text-neutral-600 text-white text-base text-2xl">Better than you could imagine.</span>
          </p>
          <p className="text-neutral-600 text-grey text-base mt-20 text-2xl ml-8 text-center">
            *still in alpha
          </p>

          <div className="mt-24"></div>
          <div className="flex space-x-40">
            <button
              type="button"
              className="ml-[30vh] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Get started
            </button>
            <button
              type="button"
              className="mr-[20vh] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Read a guide
            </button>
          </div>
        </div>
      </div>
<<<<<<< HEAD
<div className="mt-48 ">
<div className="">
  <p className="text-white text-3xl ml-[70vh]" >What do you get?</p>
<div className="mt-[-3vh]" >
  <p className="text-neutral-600 text-grey text-base text-xl ml-[100vh]">All the tools you could need to make your website.</p>
  <p className="text-white text-xl ml-[100vh]">Without ever leaving your browser.</p>
</div>
</div>
<div className="mt-32">
<CardHoverEffectDemo />
</div>
<div className="flex items-center justify-center mt-[15vh]">
  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
  Patch Notes
  </button>
</div>
</div>
<div className="flex mt-64">
  <div className="flex-1">
    <p className="text-9xl text-[#efefef]">Get started it’s free!</p>
  </div>
  <div className="flex-1">
    <p className="text-neutral-600 text-grey text-3xl mt-[20vh] ml-[15vh] ">No hidden costs, no premium plan.</p>
    <p className="text-neutral-600 text-grey text-3xl ml-[15vh] ">Everything is free and you keep it forever.</p>
    <p className="text-[#efefef] text-3xl ml-[15vh] mt-[5vh] ">Sign Up now and start using warp.</p>
     <div className="flex space-x-40 mt-40">
  <button type="button" className="ml-[16vh] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    Get started
  </button>
  <button type="button" className="mr-[20vh] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
    Read a guide
  </button>
  </div>
  </div>
</div>

<div className="mt-[25vh]">
      <Footer />
    </div>
  </div>
=======
      <div className="mt-48 ">
        <div className="">
          <p className="text-white text-3xl ml-[70vh]">What do you get?</p>
          <div className="mt-[-3vh]">
            <p className="text-neutral-600 text-grey text-base text-xl ml-[100vh]">All the tools you could need to make your website.</p>
            <p className="text-white text-xl ml-[100vh]">Without ever leaving your browser.</p>
          </div>
        </div>
        <div className="mt-32">
          <CardHoverEffectDemo />
        </div>
        <div className="flex items-center justify-center mt-[15vh]">
          <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Patch Notes
          </button>
        </div>
      </div>
      <div className="flex mt-64">
        <div className="flex-1">
          <p className="text-9xl text-[#efefef]">Get started it’s free!</p>
        </div>
        <div className="flex-1">
          <p className="text-neutral-600 text-grey text-3xl mt-[10vh] ml-[15vh]">No hidden costs, no premium plan.</p>
          <p className="text-neutral-600 text-grey text-3xl ml-[15vh]">Everything is free and you keep it forever.</p>
          <p className="text-[#efefef] text-3xl ml-[15vh] mt-[5vh]">Sign Up now and start using warp.</p>
          <div className="flex space-x-40 mt-40">
            <button type="button" className="ml-[16vh] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Get started
            </button>
            <button type="button" className="mr-[20vh] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Read a guide
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[25vh]">
        <Footer />
      </div>
    </div>
>>>>>>> decf52d2baf58690ef6bfd9cf4c15a5c9ff86fce
  );
}
