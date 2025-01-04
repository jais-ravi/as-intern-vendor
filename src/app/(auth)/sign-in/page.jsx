"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useRouter } from "next/navigation";
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
import { signInSchema } from "@/schemas/loginSchema";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsSubmitting(false);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    if (result?.ok) {
      console.log(result)
      toast({
        title: "Login successful",
        // description: "Login done",
        // variant: "",
      });
      router.push("/dashboard/overview");
    }
  };
  return (
    <div className=" min-h-screen w-full">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(70rem_circle_at_center,white,transparent)]"
        )}
      />
      <div className=" container min-h-screen flex justify-center items-center">
        <Card className=" w-full sm:w-[80%] drop-shadow-2xl z-10">
          <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center ">
              <div className="mx-auto grid  gap-6">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">Login</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <div className="mt-6">
                        <FormField
                          name="password"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end py-4">
                        <Link
                          href="/forgot-password"
                          className="text-sm underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <Button
                        className="w-full space-y-0"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="text-sm flex justify-center">
                <div>
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="underline">
                    Sign up
                  </Link>
                  </div>
                </CardFooter>
              </div>     
            </div>
            <div className="hidden bg-muted lg:block">
              <Image
                src="/next.svg"
                alt="Image"
                width="1920"
                height="1080"
                className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-r-lg"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
