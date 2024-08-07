"use client";

import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { Separator } from "../ui/separator";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !session,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !session,
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      show: session,
    },
  ];

  return (
    <div>
      <header
        className={cn(
          " flex h-16 w-full px-4 shrink-0 items-center font-normal shadow-xl dark:shadow-lg dark:shadow-white/15"
        )}
      >
        {/* For mobile screen */}
        <div className="md:w-auto w-full flex justify-between items-center">
          <div>
            <Link
              className="md:hidden flex items-center font-bold italic text-xl gap-1 mr-6"
              href={"/"}
            >
              <Image
                className="w-10"
                src="./logo.svg"
                alt="logo"
                width={50}
                height={50}
              />
              <span className="">HonestyBox</span>
            </Link>
          </div>

          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden">
                  <MenuIcon className="h-6 w-6" size={24} />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                {session ? (
                  <div className="text-lg mt-5 mb-3">
                    Welcome,{" "}
                    <span className="font-bold text-[#804dff]">
                      {user.username || user.email}
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl text-[#804dff] font-bold mt-5 mb-3">
                    HonestyBox
                  </div>
                )}

                <Separator />

                <div className="grid gap-2 py-6 hover:underline">
                  {menuItems.map((menuItem, i) =>
                    menuItem.show ? (
                      <Link
                        className="flex w-full items-center py-2 text-lg font-semibold"
                        href={menuItem.path}
                        key={i}
                      >
                        {menuItem.label}
                      </Link>
                    ) : null
                  )}

                  {session && (
                    <Button
                      className="flex w-full items-center py-2 text-lg font-semibold"
                      variant="default"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* For mobile screen */}

        {/* Larger screen navbar */}

        <Link
          className="hidden font-bold italic text-2xl gap-1 lg:flex mr-6"
          href={"/"}
        >
          <Image
            className="w-10"
            src="./logo.svg"
            alt="logo"
            width={50}
            height={50}
          />
          <span className="">HonestyBox</span>
        </Link>

        {session && (
          <div className="hidden md:flex md:items-center h-5 w-[1.5px] mr-5 bg-[#804dff]" />
        )}

        {session ? (
          <div className="hidden md:flex md:items-center">
            Welcome,{" "}
            <span className="text-lg font-bold text-[#804dff]">
              {user.username || user.email}
            </span>
          </div>
        ) : null}

        <nav className="ml-auto items-center hidden lg:flex gap-6">
          {menuItems.map((menuItem, i) => {
            return menuItem.show ? (
              <Link
                onClick={() => sessionStorage.removeItem("filterParams")}
                className="group inline-flex h-9 w-max items-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:underline transition-all duration-300 hover:scale-110"
                href={menuItem.path}
                key={i}
              >
                {menuItem.label}
              </Link>
            ) : null;
          })}
          {session && (
            <Button variant="link" onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </nav>
        {/* Larger screen navbar */}
      </header>
    </div>

    // <nav className=" p-4 shadow-md dark:shadow-slate-400/50 dark:shadow-md">
    //   <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    //     <a className="text-xl font-bold mb-4 md:mb-0" href="/">
    //       Honesty Box
    //     </a>
    //     <div className="flex">
    //       {session ? (
    //         <>
    //           <div>
    //             <span className="mr-4">
    //               Welcome, {user.username || user.email}
    //             </span>
    //             <Button className="w-full md:w-auto" onClick={() => signOut()}>
    //               Logout
    //             </Button>
    //           </div>
    //         </>
    //       ) : (
    //         <>
    //           <Link href={"/sign-in"}>
    //             <Button className="w-full md:w-auto">Login</Button>{" "}
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
