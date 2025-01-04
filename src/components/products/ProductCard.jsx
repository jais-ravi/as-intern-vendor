"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, isLoading }) {

  if (isLoading) {
    return (
      <Card className="animate-pulse  p-4 rounded-lg max-w-72 min-w-64">
        <CardContent className="space-y-4">
          <Skeleton className="h-40 rounded" />
          <Skeleton className="h-4 rounded w-1/2" />
          <Skeleton className="h-4 rounded" />
          <Skeleton className="h-4 rounded" />
        </CardContent>
      </Card>
    );
  }

  const firstImageBuffer = product.productImages[0]?.data;
  const imageSrc = firstImageBuffer
    ? `data:image/png;base64,${Buffer.from(firstImageBuffer).toString(
        "base64"
      )}`
    : "/path/to/placeholder-image.png"; // Provide a fallback image


  return (
    <Card className=" rounded-xl shadow-lg w-48 sm:w-60 hover:cursor-pointer">
      <Link href={`/dashboard/products/${product._id}`} passHref>
        <div className="cursor-pointer relative">
          <div className="absolute top-0 right-0 p-2">
            {product.discount > 0 && (
              <Badge className="text-xs">{product.discount}% OFF</Badge>
            )}
          </div>
          <CardHeader className="p-0 pb-2">
            <Image
              src={imageSrc}
              alt={product.productName}
              className="w-48 h-48 sm:w-60 sm:h-60 object-cover rounded-t-lg"
              width={200}
              height={200}
            />
          </CardHeader>
          <CardContent className=" pb-2 px-3 space-y-1">
            <CardTitle className="text-base font-semibold  capitalize">
              {product.productName}
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 line-clamp-2">
              {product.productDes}
            </CardDescription>
            <div className="mb-1 flex gap-1">
              <p className="text-lg font-bold flex items-center">
                <IndianRupee size="15" strokeWidth={3} />
                {product.sellingPrice}
              </p>
              <div className="flex gap-3">
                {product.productPrice > 0 && (
                  <p className="text-gray-500 text-sm font-semibold line-through flex items-center">
                    <IndianRupee size="13" strokeWidth={3} />
                    {product.productPrice}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Link>

    </Card>
  );
}
