"use client";
import React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import AddProduct from "@/components/products/AddProduct";

// Fetcher function for SWR
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Product() {
  const { data: session } = useSession();

  const { data: products, error } = useSWR(
    session?.user?._id ? `/api/get-product?vendorId=${session.user._id}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  if (error)
    return (
      <div className="text-center text-red-500">
        Failed to load products. Please try again later.
      </div>
    );

  return (
    <div className=" container">
      <div className="flex justify-between items-center">
        <div></div>
        <div>
          <AddProduct/>
        </div>
      </div>

      <div className=" flex flex-wrap gap-4">
        {!products ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="p-2">
              <ProductCard isLoading={true} />
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No product is found, please create a new product.
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="flex justify-center items-center ">
              <ProductCard product={product} isLoading={false} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
