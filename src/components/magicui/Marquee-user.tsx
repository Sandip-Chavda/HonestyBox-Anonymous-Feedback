import { cn } from "@/lib/utils";
import Marquee from "./marquee";
import Image from "next/image";

const reviews = [
  {
    // name: "Jack",
    // username: "@jack",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "/eye.svg",
  },
  {
    // name: "Jill",
    // username: "@jill",
    // body: "I don't know what to say. I'm speechless. This is amazing.",
    // img: "https://avatar.vercel.sh/jill",
    img: "/anonymous.svg",
  },
  {
    // name: "John",
    // username: "@john",
    // body: "I'm at a loss for words. This is amazing. I love it.",
    // img: "https://avatar.vercel.sh/john",
    img: "/lock.svg",
  },
  {
    // name: "Jane",
    // username: "@jane",
    // body: "I'm at a loss for words. This is amazing. I love it.",
    // img: "https://avatar.vercel.sh/jane",
    img: "/secure.svg",
  },
  {
    // name: "Jenny",
    // username: "@jenny",
    // body: "I'm at a loss for words. This is amazing. I love it.",
    // img: "https://avatar.vercel.sh/jenny",
    img: "/security.svg",
  },
  {
    // name: "James",
    // username: "@james",
    // body: "I'm at a loss for words. This is amazing. I love it.",
    // img: "https://avatar.vercel.sh/james",
    img: "/mobile.svg",
  },
  { img: "/sendmessage.svg" },
  { img: "/shareideas.svg" },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-xl p-4"
      )}
    >
      <Image src={img} height={70} width={70} alt="Marquee-Images" />
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex mt-14 w-full flex-col items-center justify-center overflow-hidden bg-background">
      <Marquee pauseOnHover className="[--duration:10s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:10s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
