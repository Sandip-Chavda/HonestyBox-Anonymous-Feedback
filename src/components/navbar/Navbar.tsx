"use client";

import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SquareMenu, UserCircle } from "lucide-react";

const Navbar = () => {
  const currentURL = window.location.href;
  const dashboardUrl = currentURL.endsWith("/dashboard");
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className=" p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <a className="text-xl font-bold mb-4 md:mb-0" href="/">
          Honesty Box
        </a>
        <div className="flex">
          {session ? (
            <>
              <div>
                <span className="mr-4">
                  Welcome, {user.username || user.email}
                </span>
                <Button className="w-full md:w-auto" onClick={() => signOut()}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <Button className="w-full md:w-auto">Login</Button>{" "}
              </Link>
            </>
          )}

          {dashboardUrl ? (
            <Link href={"/"}>
              <Button className="w-full md:w-auto">Home</Button>
            </Link>
          ) : null}

          {session && !dashboardUrl ? (
            <Link href={"/dashboard"} className="ml-2">
              <Button className="w-full md:w-auto">Dashboard</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
