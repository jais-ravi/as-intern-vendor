import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="py-10 bg-zinc-800 text-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[80%]">
        {/* Logo Section */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-2xl font-bold">LOGO</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <Link href="/faq">
            <span className="text-sm hover:text-gray-400 cursor-pointer">
              FAQ&apos;s
            </span>
          </Link>
          <Link href="/how-it-works">
            <span className="text-sm hover:text-gray-400 cursor-pointer">
              How It Works
            </span>
          </Link>
          <Link href="/sign-in">
            <span className="text-sm hover:text-gray-400 cursor-pointer">
              Sign In
            </span>
          </Link>
          <Link href="/sign-up">
            <span className="text-sm hover:text-gray-400 cursor-pointer">
              Sign Up
            </span>
          </Link>
          <Link href="/report-problem">
            <span className="text-sm hover:text-gray-400 cursor-pointer">
              Report a Problem
            </span>
          </Link>
        </div>

        {/* Contact & Support */}
        <div className="flex flex-col items-center sm:items-end space-y-2 text-center sm:text-right">
          <p className="text-sm">Contact Customer Support</p>
          <Link href="mailto:support@moglix.com">
            <span className="text-sm hover:text-gray-400 cursor-pointer">
              support@abc.com
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
