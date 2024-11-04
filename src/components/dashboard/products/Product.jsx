"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Product() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      if (!session?.user?._id) return;

      try {
        setIsLoading(true);
        setError(null);
        const vendorId = session.user._id;
        const response = await axios.get(`/api/get-product?vendorId=${vendorId}`);
        const data = response.data;

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array but got:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorProducts();
  }, [session]);

  return (
    <div className="mx-auto py-6">
       <Card> 
      <CardHeader className="text-center">{/*Showing 10 Products - Use Pagination Below to View More*/}</CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => ( 
                <Card key={index} className="p-2">
                  <ProductCard isLoading={true} />
                </Card>
              ))
            : error
            ? <div className="col-span-full text-center text-red-500">Something went wrong...</div> 
            : products.length === 0
            ? <div className="col-span-full text-center text-gray-500">No product is found, please create a new product.</div> // Message when no products are available
            : products.map((product) => (
                <div key={product._id} className="">
                  <ProductCard product={product} isLoading={false} />
                </div>
              ))}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
