"use client";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import bankDetailsSchema from "@/schemas/bankDetailsSchema";

export default function BankDetailsForm({ vendorId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const vendor = session?.user; // Vendor info from session
  // console.log(vendorId)
  // ZOD implementation
  const form = useForm({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountNumber: "",
      ifsc: "",
      accountHolderName: "",
    },
  });

  // const onSubmit = async (data) => {
  //   console.log(data)
  // }
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data)
      const response = await axios.post(
        "/api/add-fund-account",
        data
        
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        // Use the returned userId (_id) to navigate to the verify route
        // router.replace(`/verify/${response.data.userId}`);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error", error); // message chnge kro
      console.error(error.response?.data || error.message);
    // throw new Error("Bank details verification failed");
      if (axios.isAxiosError(error)) {
        let errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-red-500">
      <Card className="z-10 w-full max-w-md ">
        <div className="flex items-center justify-center">
          <div className=" grid gap-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Signup</CardTitle>
              <CardDescription>
                Enter your details below to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    name="accountNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Account Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="ifsc"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                          <Input placeholder="IFSC Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="accountHolderName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Account Holder Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      "Signup"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            {/* <CardFooter></CardFooter> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
