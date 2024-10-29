"use client"; 
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";

export default function Product() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    if (session) {
      const fetchVendorProducts = async () => {
        try {
          const response = await fetch(`/api/products/get-products?vendorId=${session.user._id}`);
          const data = await response.json();

          if (Array.isArray(data)) {
            setProducts(data);
            setDataLength(data.length);
          } else {
            console.error("Expected array but got:", data);
            setProducts([]);
            setDataLength(0);
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
          setProducts([]);
          setDataLength(0);
        } finally {
          setIsLoading(false);
        }
      };
      fetchVendorProducts();
    }
  }, [session]);

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading
            ? Array.from({ length: dataLength || 10 }).map((_, index) => (
                <Card key={index} className="p-2">
                  <ProductCard isLoading={true} />
                </Card>
              ))
            : products.map((product) => (
                <div key={product._id} className="p-2">
                  <ProductCard
                    product={product}
                    isLoading={false}
                  />
                </div>
              ))}
        </CardContent>
      </Card>
    </div>
  );
}
