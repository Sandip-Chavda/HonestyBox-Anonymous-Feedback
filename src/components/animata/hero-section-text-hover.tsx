import React from "react";
import { Map } from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ItemProps {
  emoji: string;
  position: string;
}

interface HeroCardProps {
  destinations?: ItemProps[];
  treasures?: ItemProps[];
  className?: string;
}

const HeroSectionTextHover: React.FC<HeroCardProps> = ({ className }) => {
  const destinations: ItemProps[] = [
    {
      //   emoji: "🪂",
      emoji: "🤐",
      position:
        "-left-20 top-3 group-hover:-rotate-[10deg] group-hover:-translate-y-12 md:-left-28 md:-top-2 sm:-left-24",
    },
    {
      //   emoji: "🏖️",
      emoji: "🕵️‍♂️",
      position:
        "-left-[72px] top-0 group-hover:-rotate-[20deg] group-hover:-translate-x-10 md:-left-[110px] md:top-12 sm:-left-24 ",
    },
    {
      //   emoji: "🚁",
      emoji: "🎭",
      position:
        "left-[150px] top-0 group-hover:rotate-[10deg] group-hover:-translate-y-10 md:left-[180px] md:top-1 sm:left-[180px]",
    },
    {
      //   emoji: "🏯",
      emoji: "🦄",
      position:
        "left-[105px] top-0 group-hover:rotate-[20deg] group-hover:translate-x-16 md:left-[200px] md:top-10 sm:left-[150px]",
    },
  ];

  const treasures: ItemProps[] = [
    {
      //   emoji: "🦝",
      emoji: "🦊",
      position:
        "-left-[100px] -top-7 -rotate-[30deg] group-hover:-translate-y-8 md:-left-40 md:-top-16 sm:-left-32",
    },
    {
      emoji: "🎊",
      position:
        "-left-[115px] -top-2 group-hover:-rotate-45 md:-left-44 md:top-10 sm:-left-36",
    },
    {
      //   emoji: "🏝️",
      emoji: "🪬",
      position:
        "left-32 -top-12 rotate-[30deg] md:left-[200px] md:-top-[70px] sm:left-[175px] sm:-top-12",
    },
    {
      //   emoji: "💎",
      emoji: "✏️",
      position:
        "left-32 -top-2 group-hover:rotate-[10deg] md:left-[280px] md:-top-1 sm:left-[160px] ",
    },
  ];

  return (
    <div
      className={cn(
        "storybook-fix relative min-h-[100px] w-full  md:min-h-[200px]",
        className
      )}
    >
      <div className="mb-2 flex flex-col items-center justify-center gap-3">
        <div className="text-normal flex flex-col items-center justify-center p-5 font-bold text-2xl md:text-5xl !leading-snug">
          <div className="flex items-center justify-center gap-1">
            <span className="">Explore</span>
            <div className="group relative flex items-center">
              <span className="text-[#804dff] group-hover:text-[#6a31f8]">
                Anonymous
              </span>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {destinations.map((dest, index) => (
                  <span
                    key={index}
                    className={cn(
                      "pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl",
                      dest.position
                    )}
                  >
                    {dest.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="mr-2">Feedback With</span>
            <div className="group relative flex items-center">
              <span className="text-[#804dff] group-hover:text-[#6a31f8]">
                HonestyBox
              </span>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {treasures.map((gem, index) => (
                  <span
                    key={index}
                    className={cn(
                      "pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl",
                      gem.position
                    )}
                  >
                    {gem.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="md:text-sm text-xs mt-3 font-normal shadow-sm shadow-[#804dff] text-gray-600 dark:text-gray-300 border border-[#804dff] px-3 py-1.5 rounded-full">
            Share your thoughts while staying incognito.🪬
          </div>
        </div>

        <Link href="/sign-in">
          <button className="cursor-pointer rounded-3xl bg-[#804dff] px-4 py-2 hover:bg-[#6a31f9] text-white">
            Begin your journey
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSectionTextHover;
