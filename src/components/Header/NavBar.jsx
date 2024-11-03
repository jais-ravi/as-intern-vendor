"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { GoVerified } from "react-icons/go";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { ThemeBtn } from "./ThemeBtn";

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
            <h1>{user.firstName}</h1>
            <div>
              <h1>{user.isAdmin ? (<GoVerified size="30" />
              ) : (<>X</>)}</h1>
            </div>
            <ThemeBtn/>
            <Button onClick={handleSignOut}>Logout</Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
