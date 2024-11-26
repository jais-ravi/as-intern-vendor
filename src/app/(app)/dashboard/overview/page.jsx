"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineProduct } from "react-icons/ai";
import { TbTruckLoading } from "react-icons/tb";
import { HiOutlineTruck } from "react-icons/hi2";
import { OverViewChart } from "@/components/component/OverViewChart";
import OverViewRecentSale from "@/components/component/OverViewRecentSale";


const OverViewPage = () => {
  const { data: session } = useSession();
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?._id) return;

    const fetchData = async () => {
      try {
        const vendorId = session.user._id;
        const response = await axios.get(
          `/api/overview/totalProduct?vendorId=${vendorId}`
        );
        if (typeof response.data.count === "number") {
          setTotalProducts(response.data.count);
        } else {
          console.warn("Unexpected API response format:", response.data);
          setTotalProducts(0);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching total products:", error);
        setTotalProducts(0);
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?._id]);
  const data = [
    {
      title: "Total Revenue",
      headIcon: <IndianRupee strokeWidth={2} />,
      tailIcon: <IndianRupee strokeWidth={3} size={25} />,
      contentData: "99999",
      footdata: "+20.1% from last month",
    },
    {
      title: "Total Products",
      headIcon: <AiOutlineProduct size={25} />,
      tailIcon: <AiOutlineProduct size={30} strokeWidth={10} />,
      contentData: totalProducts,
      footdata: "+20.1% from last month",
    },
    {
      title: "Total Orders",
      headIcon: <HiOutlineTruck strokeWidth={2} size={30} />,
      tailIcon: <HiOutlineTruck strokeWidth={2} size={25} />,
      contentData: "99999",
      footdata: "+20.1% from last month",
    },
    {
      title: "Pending Orders",
      headIcon: <TbTruckLoading strokeWidth={2} size={25} />,
      tailIcon: <TbTruckLoading strokeWidth={2} size={30} />,
      contentData: "99999",
      footdata: "+20.1% from last month",
    },
  ];

  return (
    <div className=" container">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <h1>{item.title}</h1>
                {item.headIcon}
              </div>
            </CardHeader>
            <CardContent className="text-2xl py-0 font-semibold flex items-center gap-1">
              {item.tailIcon}
              {loading ? (
                <Skeleton className="h-8 w-1/2" />
              ) : (
                <NumberTicker value={item.contentData} />
              )}
            </CardContent>
            <CardFooter className="text-xs pt-2">{item.footdata}</CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 pt-5">
        <div className="w-full lg:w-3/5">
          <OverViewChart />
        </div>
        <div className="w-full lg:w-2/5">
          <OverViewRecentSale />
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
