import React from "react";
import { LuMousePointerClick } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { LuShoppingCart } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const WorkSection = () => {
  const data = [
    {
      icon: <LuMousePointerClick size={40} />,
      title: "Register yourself as a supplier",
      description: "Get your GST, cheque and PAN card handy",
    },
    {
      icon: <AiOutlineProduct size={40} />,
      title: "Create catalog of your products",
      description: "Our system creates listing in seconds",
    },
    {
      icon: <LuShoppingCart size={40} />,
      title: "Get orders from crores of customers",
      description: "Don't worry we'll take care of the logistics",
    },
    {
      icon: <RiMoneyRupeeCircleLine size={40} />,
      title: "Get payment credited in your account",
      description: "Your payment directly credit to your account",
    },
  ];

  return (
    <div className="py-14 bg-zinc-800">
      <div className="w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-10 underline">
          How it works
        </h1>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex justify-center items-center">
            <div className="max-w-xs space-y-3 text-center">
              <div className="w-full flex justify-center items-center text-white">
                {item.icon}
              </div>
              <h1 className="text-xl font-semibold text-white">{item.title}</h1>
              <p className="text-sm font-semibold text-white">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
