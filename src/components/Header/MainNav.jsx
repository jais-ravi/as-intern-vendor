"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiHamburgerMenu } from "react-icons/gi";

const MainNav = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setAtTop(true);
      } else {
        setAtTop(false);
      }

      if (currentScrollY > lastScrollY) {
        setShow(false);
        setIsScrolled(true);
      } else {
        setShow(true);
        setIsScrolled(true);
      }
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={`w-full transition-all duration-300 fixed z-50 ${
        show ? "top-0" : "-top-14"
      } ${
        atTop
          ? "bg-transparent"
          : isScrolled
          ? "bg-white bg-opacity-50 backdrop-blur-lg dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-lg"
          : ""
      }`}
    >
      <div className="container h-14 flex justify-between items-center">
        <div>
          <h1>Logo</h1>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">How it Works</Button>
            <Button variant="ghost">FAQ&apos;s</Button>
          </div>
          <Link href="/sign-in">
            <Button variant="outline">
              Sign-in
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="md:hidden">
                <GiHamburgerMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>How it Works</DropdownMenuItem>
              <DropdownMenuItem>FAQ&apos;s</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
