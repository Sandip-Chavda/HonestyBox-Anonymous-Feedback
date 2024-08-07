import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaGithub, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full border-t border-[#804dff] pt-10">
      <div className="flex flex-row items-center">
        {/* 1 */}
        <div className="hidden md:flex flex-col w-[30%] mx-auto gap-3 items-center">
          <Image alt="Logo" src="/logo.svg" height={60} width={60} />

          <div className="text-4xl font-bold italic">HonestyBox</div>
        </div>
        {/* 2 */}
        <div className="md:w-[70%] w-full px-4 flex justify-between md:justify-evenly items-center">
          <div className="flex md:flex-row flex-col  gap-4">
            <Link href="/sign-up">
              <Button className="bg-[#804dff] text-white hover:bg-[#672cfc] transition-all duration-300 font-medium">
                Getting Started Now
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="bg-transparent border-[1.5px] border-[#804dff] dark:text-white font-medium text-black hover:bg-[#804dff] hover:text-white transition-all duration-200">
                Demo Login
              </Button>
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="text-[#804dff] font-semibold text-lg">
              Explore Site
            </div>
            <Separator className="bg-[#804dff]" />
            <div className="flex flex-col font-medium gap-1 mt-2">
              <Link
                href="/"
                className="hover:text-[#753ffc] hover:underline transition-all duration-200"
              >
                Home
              </Link>
              <Link
                href="/sign-in"
                className="hover:text-[#753ffc] hover:underline transition-all duration-200"
              >
                Demo Login
              </Link>
              <Link
                href="/sign-up"
                className="hover:text-[#753ffc] hover:underline transition-all duration-200"
              >
                Signup
              </Link>
              <Link
                href="#faq"
                className="hover:text-[#753ffc] hover:underline transition-all duration-200"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Separator className="md:w-[15%] w-[20%] mt-8 md:mt-6 mx-auto bg-[#804dff]" />

      <div className="flex md:flex-row flex-col items-center justify-evenly pt-5 md:pt-10 pb-10">
        <div className="flex items-center md:text-base text-sm">
          HonestyBox is made by{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/sandip-chavda-86704a2aa/"
            className="md:text-lg text-base ml-1 font-bold dark:text-[#a27efc] text-[#804dff]"
          >
            Sandip Chavda
          </Link>{" "}
          🙋🏻 from{" "}
          <Image
            src="/India.svg"
            alt="India-img"
            height={30}
            width={30}
            className="ml-1"
          />
        </div>

        <div className="flex mt-3 gap-4">
          <Link href="">
            <FaLinkedin
              size={28}
              className="text-blue-500 hover:scale-110 transition-all duration-300"
            />
          </Link>
          <Link href="">
            <FaGithub
              size={28}
              className="text-black dark:text-white hover:scale-110 transition-all duration-300"
            />
          </Link>
          <Link href="">
            <FaGlobe
              size={28}
              className="text-orange-500 hover:scale-110 transition-all duration-300"
            />
          </Link>
          <Link href="">
            <FaSquareXTwitter
              size={28}
              className="text-black dark:text-white hover:scale-110 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
