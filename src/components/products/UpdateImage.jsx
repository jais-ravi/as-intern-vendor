"use client";
import React, { useState } from "react";
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
import { productSchema } from "@/schemas/productSchema";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { productImagesValidation } from "@/schemas/updateProductSchema";


const UpdateImage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(productImagesValidation),
    defaultValues: {
      productImages: [],
    },
  });

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
  };

  return (
    <div>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            encType="multipart/form-data"
          >
              <div className="space-y-6">
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
                            className={`flex justify-center items-center w-full py-20 border-2 border-dashed rounded-lg transition-colors hover:border-black bg-blue-50 duration-300 ${
                              isDragging
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-gray-100"
                            } cursor-pointer`} 
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
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default UpdateImage;
