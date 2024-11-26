"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { IndianRupee } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";


const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/product-details`, {
        params: { productId: params.id },
      });
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error in fetching product data", error);
      toast({
        title: "Server error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-14" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div className="flex justify-center">
            <Skeleton className="h-80 w-80" />
          </div>
          <div>
            <Skeleton className="h-10 w-60" />
            <div className="mt-2 space-y-1">
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
            <div className="flex gap-5 my-3">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-60 my-5" />
            <Skeleton className="h-60 my-5" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500">
        Something went wrong...
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const images = product.productImages || [];
  const fallbackImage = "/path/to/placeholder-image.png";
  const editPage = () => {
    router.push(`/dashboard/edit-product/${product._id}`);
  };
  return (
    <div>
      <div className="container">
        <div className="py-1 flex justify-between items-center">
          <Button size="icon" variant="outline" onClick={handleBack}>
            <ChevronLeft />
          </Button>
          <Button onClick={editPage}>Edit</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="m-auto my-0">
            <Carousel className="w-full max-w-[17rem] sm:max-w-[20rem]">
              <CarouselContent>
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="overflow-hidden">
                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            <Image
                              src={`data:image/png;base64,${Buffer.from(
                                image.data
                              ).toString("base64")}`}
                              alt={`Product Image ${index + 1}`}
                              className="w-full h-full object-cover"
                              width={100}
                              height={100}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={fallbackImage}
                            alt="Fallback Product Image"
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="-left-3 sm:-left-12" />
              <CarouselNext className="-right-3 sm:-right-12" />
            </Carousel>
          </div>

          <div className="space-y-4">
            <h1 className="text-lg font-semibold capitalize-first-letter">
              {product.productName}
            </h1>
            <p className="text-sm text-zinc-500 capitalize-first-letter">
              {product.productDes}
            </p>
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold flex items-center">
                <IndianRupee size="22" strokeWidth={3} />
                {product.sellingPrice}
              </h1>
              {product.discount && (
                <h1 className="text-xl font-bold text-zinc-500 line-through flex items-center">
                  <IndianRupee size="20" strokeWidth={3} />
                  {product.productPrice}
                </h1>
              )}
            </div>
            {product.discount && <Badge>{product.discount}% OFF</Badge>}
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <h1 className="flex gap-1">
                    Brand:{" "}
                    <div className="capitalize-first-letter">
                      {product.productBrand}
                    </div>
                  </h1>
                  <h1>Tag: {product.tags.join(",")}</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <h1 className="flex items-center">
                    Delivery Charge: <IndianRupee size="15" strokeWidth={3} />
                    {product.deliveryCharge}
                  </h1>
                  <h1>Free Delivery: {product.freeDelivery ? "Yes" : "No"}</h1>
                </div>
                <h1>Out of Stock: {product.outOfStocks ? "Yes" : "No"}</h1>
                <h1>
                  Created on:{" "}
                  {new Date(product.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>Product Reviews by Customers</CardDescription>
              </CardHeader>
              <CardContent>
                {product.reviews?.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <p key={index} className="text-zinc-500">
                      {review}
                    </p>
                  ))
                ) : (
                  <p className="text-zinc-500">No Reviews yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
