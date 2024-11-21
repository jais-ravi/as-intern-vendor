"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateProductSchema } from "@/schemas/updateProductSchema";
import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const AddProduct = ({ product }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productName: product?.productName || "",
      productDes: product?.productDes || "",
      productPrice: product?.productPrice || "",
      sellingPrice: product?.sellingPrice || "",
      discount: product?.discount || "",
      productBrand: product?.productBrand || "",
      category: product?.category || "",
      tags: product?.tags || "",
      deliveryCharge: product?.deliveryCharge || 0,
      freeDelivery: product?.deliveryCharge <= 0,
    },
  });

  const productPrice = form.watch("productPrice");
  const sellingPrice = form.watch("sellingPrice");
  const freeDelivery = form.watch("freeDelivery");

  useEffect(() => {
    if (productPrice && sellingPrice) {
      const discount = ((productPrice - sellingPrice) / productPrice) * 100;
      form.setValue("discount", discount.toFixed(2));
    }
  }, [productPrice, sellingPrice, form]);

  useEffect(() => {
    const deliveryCharge = form.getValues("deliveryCharge");
    if (deliveryCharge > 0) {
      form.setValue("freeDelivery", false);
    } else {
      form.setValue("freeDelivery", true);
    }
  }, [form]);

  useEffect(() => {
    if (freeDelivery) {
      form.setValue("deliveryCharge", 0);
    }
  }, [freeDelivery, form]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("productDes", data.productDes);
      formData.append("productPrice", data.productPrice);
      formData.append("sellingPrice", data.sellingPrice);
      formData.append("discount", data.discount);
      formData.append("productBrand", data.productBrand);
      formData.append("category", data.category);
      formData.append("tags", data.tags);
      formData.append("freeDelivery", data.freeDelivery);
      formData.append(
        "deliveryCharge",
        data.freeDelivery ? 0 : data.deliveryCharge
      );

      setIsSubmitting(true);
      const productId = product?._id;

      const response = await axios.patch(
        `/api/update-product?productId=${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error in updating product", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Product updation failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="text-center text-3xl">Add Product</DialogTitle>
        <DialogDescription className="text-center text-base">
          Enter your details below to add a new product
        </DialogDescription>
      </DialogHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-16 md:grid-cols-1">
              <div></div>
              <div className="flex flex-col gap-5">
                <FormField
                  name="productName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="productDes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your product description here."
                          {...field}
                          className="resize-none h-52"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="productPrice"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Product Price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="sellingPrice"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selling Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Selling Price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="discount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount % (auto-calculate)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Discount"
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="productBrand"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Brand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="tags"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="Tags" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="freeDelivery"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <FormLabel>Free Delivery</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              form.setValue("freeDelivery", checked);
                            }}
                          />
                        </FormControl>
                        <span>{field.value ? "Yes" : "No"}</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!freeDelivery && (
                  <FormField
                    name="deliveryCharge"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Charge</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Delivery Charge"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Update Product"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default AddProduct;
