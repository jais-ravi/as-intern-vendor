"use client";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
import { signUpSchema } from "@/schemas/signupSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // ZOD implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber:"",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/sign-up", data);

      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        // Use the returned userId (_id) to navigate to the verify route
        router.replace(`/verify/${response.data.userId}`);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in signup of user", error);

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
    <div className="w-full  ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(70rem_circle_at_center,white,transparent)]"
        )}
      />
      <div className=" container min-h-screen flex justify-center items-center">
        <Card className="w-full  sm:w-[80%] drop-shadow-2xl z-10">
          <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
            <div className="hidden bg-muted lg:block rounded-l-xl ">
              <Image
                src="/next.svg"
                alt="Image"
                width="1920"
                height="1080"
                className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "
              />
            </div>
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
                    <div className="flex gap-2">
                      <FormField
                        name="firstName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lastName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                      <FormField
                        name="contactNumber"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact No. (WhatsApp)</FormLabel>
                            <FormControl>
                            <Input placeholder="9876543210" type="number" {...field} className="no-spinner" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input placeholder="E-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Password"
                                {...field}
                              />
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
                <CardFooter className="flex justify-center">
                <div className="text-center text-sm " >
                  Already have an account?{" "}
                  <Link href="/sign-in" className="underline">
                    Login
                  </Link>
                </div>
                </CardFooter>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
