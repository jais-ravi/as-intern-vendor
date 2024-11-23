import { Button } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";
import WordPullUp from "@/components/ui/word-pull-up";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className=" py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
          <GridPattern
            squares={[
              [4, 4],
              [5, 1],
              [8, 2],
              [5, 3],
              [5, 5],
              [10, 10],
              [12, 15],
              [15, 10],
              [10, 16],
              [16, 11],
              [11, 15],
              [17, 12],
            ]}
            className={cn(
              "[mask-image:radial-gradient(40rem_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-full skew-y-12"
            )}
          />
          <div className="flex justify-center flex-col px-4 md:px-0">
            <WordPullUp
              className="text-5xl font-bold text-black dark:text-white max-w-[40rem] leading-tight"
              words="Want to sell your products to millions of B2B customers globally?"
            />
            <div className="w-52 mt-10">
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

            <div className="relative w-full md:w-[100%] lg:w-[90%]  flex justify-center items-center">
              <Image
                src="/rb_2149483144.png"
                alt="image"
                width={1500} 
                height={1000}
                className="object-cover"
              />
            </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
