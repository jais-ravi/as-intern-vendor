import MainNav from "@/components/Header/MainNav";
import NavBar from "@/components/Header/NavBar";
import { Button } from "@/components/ui/button";
import WordPullUp from "@/components/ui/word-pull-up";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen ">
      <MainNav />
      <div className="container">
        <div className=" h-[40rem] grid grid-cols-2 gap-10 ">
          <div className="flex justify-center  flex-col ">
            <WordPullUp
              className="text-5xl font-bold text-black dark:text-white max-w-[40rem] leading-tight"
              words="Want to sell your products to millions of B2B customers globally?"
            />
            <div className="w-52 mt-10 ">
              <Link href="/sign-up">
                <Button
                  variant="secondary"
                  className="w-full border-2 border-zinc-500"
                >
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/rb_2149483144.png"
              alt="image"
              layout="responsive"
              width={960} // Adjusted to a higher resolution to avoid pixelation
              height={640} // Adjusted accordingly to keep the aspect ratio
              className="w-[30rem] h-[20rem]"
            />
          </div>
        </div>
      </div>
      <div className="h-96 bg-zinc-600"></div>
    </div>
  );
};

export default page;
