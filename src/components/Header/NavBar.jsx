"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { GoVerified } from "react-icons/go";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { ThemeBtn } from "./ThemeBtn";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, LogOut, Store, TriangleAlert, User } from "lucide-react";
import BlurIn from "../ui/blur-in";

const NavBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have successfully signed out.",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign out.",
        status: "error",
      });
    }
  };

  return (
    <div className="w-full h-16  flex justify-between items-center border-b-2 border-slate-400">
      <div className="flex justify-between items-center container">
        <div>
          <h1>Logo</h1>
        </div>
        {session ? (
          <div className="flex justify-center items-center gap-5">
            <BlurIn
              word={
                <div className="hidden md:block">
                  <h1 className="flex gap-2">
                    <div>Hello,</div>
                    {user.firstName}
                  </h1>
                </div>
              }
              className="text-lg font-semibold text-black dark:text-white"
            />
            <ThemeBtn />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon">
                  <AlignJustify />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Store />
                  Shop
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TriangleAlert />
                  Report a problem
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
