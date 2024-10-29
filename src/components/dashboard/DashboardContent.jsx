import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProduct from "./component/AddProduct";
import Product from "./products/Product";
Product;

const DashboardContent = () => {
  return (
    <div className="w-full py-5 ">
      <div className="container ">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
        <div className=" mt-5">
          <Tabs defaultValue="products" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add-product">Add Product</TabsTrigger>
            </TabsList>
            <div className="mt-5">
              <TabsContent value="overview">working...</TabsContent>
              <TabsContent value="products">
                <h1 className="font-bold text-3xl">Your Products</h1>
                <Product />
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
