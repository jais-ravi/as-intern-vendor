"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { ThemeBtn } from "./ThemeBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsRight,
  ChevronsUpDown,
  LogOut,
  Store,
  TriangleAlert,
  User,
} from "lucide-react";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const SideBarFooter = () => {
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
  const { isMobile } = useSidebar();
  return (
    <div>
      {session ? (
        <div className="flex justify-center items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                variant="outline"
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {`${user.firstName[0]}${user.lastName[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold space-x-2">
                    <span>{user.firstName}</span>
                    <span>{user.lastName}</span>
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsRight className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {`${user.firstName[0]}${user.lastName[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold space-x-2">
                      <span>{user.firstName}</span>
                      <span>{user.lastName}</span>
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/dashboard/profile/${user._id}`}>
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href={`/dashboard/shop/${user._id}`}>
                <DropdownMenuItem>
                  <Store />
                  Shop
                </DropdownMenuItem>
              </Link>
              <Link href="/report-problem">
              <DropdownMenuItem>
                <TriangleAlert />
                Report a problem
              </DropdownMenuItem>
              </Link>
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
  );
};

export default SideBarFooter;
