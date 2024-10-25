import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProduct from "./component/AddProduct";

const DashboardContent = () => {
  return (
    <div className="w-full py-5 ">
      <div className="container ">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
        <div className=" mt-5">
          <Tabs defaultValue="add-product" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="add-product">Add Product</TabsTrigger>
            </TabsList>
            <div className="mt-5">
              <TabsContent value="overview">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="add-product">
                <AddProduct />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
