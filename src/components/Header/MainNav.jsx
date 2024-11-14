import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ThemeBtn } from "./ThemeBtn";

const MainNav = () => {
  return (
    <div className="w-full h-14 flex justify-between items-center container">
      <div>
        <h1>Logo</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">How it Works</Button>
        <Button variant="ghost">FAQ's</Button>
        <Link href="/sign-in">
          <Button variant="outline">Sign-in</Button>
        </Link>
        <ThemeBtn/>
      </div>
    </div>
  );
};

export default MainNav;
