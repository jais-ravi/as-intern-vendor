import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeBtn } from "./ThemeBtn";
import SparklesText from "../ui/sparkles-text";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-2 px-2 ">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className=" h-10" />
        <SparklesText className="text-3xl font-semibold" text="Dashboard" />
      </div>
      <ThemeBtn />
    </div>
  );
};

export default Header;
