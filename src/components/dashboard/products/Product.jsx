"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Product() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      if (!session) return; // Guard clause for when session is not available

      try {
        // Extract vendorId from the session
        const vendorId = session.user._id; // Adjust according to your session structure
        const response = await axios.get(`/api/get-product?vendorId=${vendorId}`);
        const data = response.data; 

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
  }, [session]);

  return (
    <div className="mx-auto py-6">
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
                  <ProductCard product={product} isLoading={false} />
                </div>
              ))}
        </CardContent>
      </Card>
    </div>
  );
}
