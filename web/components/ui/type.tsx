"use client";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";
import "../../styles/homepage.css"
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "apps",
    },
    {
      text: "Imagine you could create a full-fledged website in a day.",
      className: "text-white text-6xl",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-2xl sm:text-base  ">
      </p>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

