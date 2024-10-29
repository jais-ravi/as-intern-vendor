"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, isLoading }) {
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="animate-pulse bg-gray-200 p-4 rounded-lg h-[22.1rem]">
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
    ? `data:image/png;base64,${Buffer.from(firstImageBuffer).toString("base64")}`
    : "/path/to/placeholder-image.png"; // Provide a fallback image

  const handleEdit = () => {
    router.push(`/products/edit/${product._id}`);
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg w-[18rem]">
      <CardHeader className="p-3">
        <Image
          src={imageSrc}
          alt={product.productName}
          className="w-full h-52 object-cover rounded-t-lg"
          width={10}
          height={10}
        />
      </CardHeader>
      <CardContent className="pb-1">
        <CardTitle className="text-base font-semibold text-gray-800 mb-1">
          {product.productName}
        </CardTitle>
        <div className="text-xs text-gray-500 mb-1.5 line-clamp-2">
          {product.productDes}
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <p className="text-lg font-bold flex items-center">
              <IndianRupee size="15" strokeWidth={3} />
              {product.sellingPrice}
            </p>
            {product.discount > 0 && (
              <p className="text-gray-500 text-sm line-through flex items-center">
                <IndianRupee size="15" strokeWidth={3} />
                {product.productPrice}
              </p>
            )}
          </div>
          {product.discount > 0 && <Badge>{product.discount}% OFF</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleEdit}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
