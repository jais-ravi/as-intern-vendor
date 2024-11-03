import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { IndianRupee } from "lucide-react";
import { OverViewChart } from "./OverViewChart";
import OverViewRecentSale from "./OverViewRecentSale";

const OverViewPage = () => {
  const data = [
    {
      title: "Total Revenue",
      headIcon: <IndianRupee strokeWidth={2} />,
      contentData: "89889",
      footdata: "+20.1% from last month",
    },
    {
      title: "Total Products",
      headIcon: <IndianRupee strokeWidth={2} />,
      contentData: "89889",
      footdata: "+20.1% from last month",
    },
    {
      title: "Total Orders",
      headIcon: <IndianRupee strokeWidth={2} />,
      contentData: "89889",
      footdata: "+20.1% from last month",
    },
    {
      title: "Total Sales",
      headIcon: <IndianRupee strokeWidth={2} />,
      contentData: "89889",
      footdata: "+20.1% from last month",
    },
  ];
  return (
    <div>
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
              <IndianRupee size={25} strokeWidth={3} />
              {item.contentData}
            </CardContent>
            <CardFooter className="text-xs">{item.footdata}</CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 pt-5">
        {/* Chart Component - 60% width on large screens */}
        <div className="w-full lg:w-3/5">
          <OverViewChart />
        </div>

        {/* Recent Sales Component - 40% width on large screens */}
        <div className="w-full lg:w-2/5">
          <OverViewRecentSale />
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
