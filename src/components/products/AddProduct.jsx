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
import { Textarea } from "@/components/ui/textarea";

import { productSchema } from "@/schemas/productSchema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productDes: "",
      productImages: [],
      productPrice: "",
      sellingPrice: "",
      discount: "",
      productBrand: "",
      category: "",
      tags: "",
      freeDelivery: true,
      deliveryCharge: "",
    },
  });

  const productPrice = form.watch("productPrice");
  const sellingPrice = form.watch("sellingPrice");

  useEffect(() => {
    if (productPrice && sellingPrice) {
      const discount = ((productPrice - sellingPrice) / productPrice) * 100;
      form.setValue("discount", discount.toFixed(2));
    }
  }, [productPrice, sellingPrice, form]);

  useEffect(() => {
    if (freeDelivery) {
      form.setValue("deliveryCharge", 0);
    } else {
      form.setValue("deliveryCharge", "");
    }
  }, [freeDelivery, form]);

  // Handle the file input change and set image previews
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (selectedImages.length + files.length > 5) {
      toast({
        title: "Limit exceeded",
        description: "You can only upload up to 5 images.",
        variant: "destructive",
      });
      return; // Prevent adding more than 5 images
    }
    const newImages = [...selectedImages, ...files].slice(0, 5);
    setSelectedImages(newImages);
    form.setValue("productImages", newImages);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    form.setValue("productImages", updatedImages);
  };

  // Drag and Drop Handlers
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (selectedImages.length + files.length > 5) {
      toast({
        title: "Limit exceeded",
        description: "You can only upload up to 5 images.",
        variant: "destructive",
      });
      return; // Prevent adding more than 5 images
    }
    const newImages = [...selectedImages, ...files].slice(0, 5);
    setSelectedImages(newImages);
    form.setValue("productImages", newImages);
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      console.log("sda", data.productImages);
      formData.append("productName", data.productName);
      formData.append("productDes", data.productDes);
      formData.append("productPrice", data.productPrice);
      formData.append("sellingPrice", data.sellingPrice);
      formData.append("discount", data.discount);
      formData.append("productBrand", data.productBrand);
      formData.append("category", data.category);
      formData.append("tags", data.tags);
      formData.append("freeDelivery", freeDelivery);
      formData.append("deliveryCharge", freeDelivery ? 0 : data.deliveryCharge);

      // Append the product image(s)
      if (data.productImages && data.productImages.length > 0) {
        data.productImages.forEach((file) => {
          formData.append("productImages", file);
        });
      }

      setIsSubmitting(true);

      const response = await axios.post("/api/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        form.reset();
        setSelectedImages([]);
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Error in creating product", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Product creation failed",
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
  }

  return (

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Product</Button>
        </DialogTrigger>
        <DialogContent className=" max-h-[95vh] max-w-[70rem] overflow-auto">  
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">
              Add Product
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Enter your details below to add a new product
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <div className="grid lg:grid-cols-2 gap-16 md:grid-cols-1 ">
                <div>
                  <FormField
                    name="productImages"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Images</FormLabel>
                        <FormControl>
                          <div>
                            <label
                              htmlFor="file-upload"
                              className={`flex justify-center items-center w-full py-20 border-2 border-dashed rounded-lg transition-colors dark:bg-zinc-800 hover:border-zinc-500 bg-blue-50 duration-300 ${
                                isDragging
                                  ? "border-zinc-500 bg-blue-50"
                                  : "border-gray-300 bg-gray-100"
                              } cursor-pointer`} // Make the entire area clickable
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                            >
                              <div className="text-center w-full h-full flex flex-col items-center">
                                <p className="text-sm text-gray-500">
                                  {isDragging
                                    ? "Drop your images here..."
                                    : "Click or drag images here to upload"}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  Max file size: 5MB
                                </p>
                                <input
                                  id="file-upload"
                                  type="file"
                                  multiple
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </div>
                            </label>

                            {/* Display selected images */}
                            {selectedImages.length > 0 && (
                              <div className="mt-4 grid grid-cols-2 gap-4">
                                {selectedImages.map((image, index) => (
                                  <div key={index} className="relative">
                                    <Image
                                      src={URL.createObjectURL(image)}
                                      alt={`Selected ${index}`}
                                      className="h-full w-full object-cover rounded-md"
                                      width="1"
                                      height="1"
                                    />
                                    <Button
                                      onClick={() => handleDeleteImage(index)}
                                      className="absolute top-0 right-0 dark:bg-red-600"
                                      variant="destructive"
                                      size="icon"
                                    >
                                      <Trash className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

                  {/* Delivery Charge Section */}
                  <FormField
                    name="freeDelivery"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Delivery</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={freeDelivery}
                              onCheckedChange={(checked) =>
                                setFreeDelivery(checked)
                              }
                            />
                            <span>{freeDelivery ? "Yes" : "No"}</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Show delivery charge only when free delivery is false */}
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add Product
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

  );
};

export default AddProduct;
