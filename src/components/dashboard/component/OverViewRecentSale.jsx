import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import React from "react";

const salesData = [
  { name: "Ravi Jaiswal", email: "ravi@test.com", amount: 9999, image: "https://github.com/shadcn.png" },
  { name: "Aarav Singh", email: "aarav@test.com", amount: 8500, image: "https://github.com/shadcn.png" },
  { name: "Saanvi Sharma", email: "saanvi@test.com", amount: 7600, image: "https://github.com/shadcn.png" },
  { name: "Vivaan Gupta", email: "vivaan@test.com", amount: 5600, image: "https://github.com/shadcn.png" },
  { name: "Diya Mehta", email: "diya@test.com", amount: 9300, image: "https://github.com/shadcn.png" },
  { name: "Diya Mehta", email: "diya@test.com", amount: 9300, image: "https://github.com/shadcn.png" },
  { name: "Diya Mehta", email: "diya@test.com", amount: 9300, image: "https://github.com/shadcn.png" },
  { name: "Diya Mehta", email: "diya@test.com", amount: 9300, image: "https://github.com/shadcn.png" },
  { name: "Diya Mehta", email: "diya@test.com", amount: 9300, image: "https://github.com/shadcn.png" },
  { name: "Diya Mehta", email: "diya@test.com", amount: 9300, image: "https://github.com/shadcn.png" },

];

const OverViewRecentSale = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          {salesData.slice(0, 7).map((sale, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0 overflow-auto">
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarImage src={sale.image} alt={`@${sale.name.toLowerCase().replace(" ", "")}`} />
                </Avatar>
                <div>
                  <h1 className="capitalize font-semibold">{sale.name}</h1>
                  <p className="text-sm text-zinc-500">{sale.email}</p>
                </div>
              </div>
              <h1 className="flex items-center gap-1 font-medium text-lg">
                <IndianRupee /> {sale.amount}
              </h1>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewRecentSale;
