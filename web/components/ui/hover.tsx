import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-8xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Technology freedom",
    description:
      "Choose your own technology stack - whether that will be Vue + Tailwnd, Svelte or React + Chakra.The freedom is in your hands.",
    link: "",
  },
  {
    title: "Real-time code editing",
    description:
      "Using the power of web sockets, you can make a change to a component and see it reflected right away.",
    link: "",
  },
  {
    title: "Built-in AI",
    description:
      "Use the most bleeding-edge AI technology along your journey.",
    link: "",
  },
  {
    title: "Publish instantly",
    description:
      "Ship your ready website directly for people to see your work.",
    link: "",
  },
  {
    title: "Responsiveness made easy",
    description:
      "Make your site responsive, no matter the choice of technology, easily.",
    link: "",
  },
  { 
    title: "Collaborate with others",
    description:
      "Collaborating with others has never been easier. Collab and create. Together.",
    link: "",
  },
];
