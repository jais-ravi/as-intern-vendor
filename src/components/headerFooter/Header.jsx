import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeBtn } from "./ThemeBtn";
import SparklesText from "../ui/sparkles-text";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const title =
    session?.user?.role === "super-admin"
      ? "Admin Dashboard"
      : "Vendor Dashboard";
  return (
    <div className=" container flex justify-between items-center py-2 px-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-10" />
        <SparklesText className="text-2xl font-semibold" text={title} />
      </div>
      <ThemeBtn />
    </div>
  );
};

export default Header;
