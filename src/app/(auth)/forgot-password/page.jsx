"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { emailForgotPassSchema } from "@/schemas/emailForgotPassSchema";
import { otpForgotPassSchema } from "@/schemas/otpForgotPassSchema";
import { passForgotPassSchema } from "@/schemas/passForgotPassSchema";

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentSchema = otpVerified
    ? passForgotPassSchema
    : otpSent
    ? otpForgotPassSchema
    : emailForgotPassSchema;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleSendOtp = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/forget-password/email-sent", {
        email: data.email,
      });
      setOtpSent(true);
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Failed to Send OTP", error);

      if (axios.isAxiosError(error)) {
        let errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/forget-password/verify-otp", {
        email: form.getValues("email"),
        otp: data.otp,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
      setIsSubmitting(false);
      setOtpVerified(true);
    } catch (error) {
      console.error("Error in verify otp", error);
      if (axios.isAxiosError(error)) {
        let errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "/api/forget-password/update-password",
        {
          email: form.getValues("email"),
          password: data.confirmPassword,
        }
      );
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
      setIsSubmitting(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in update password", error);

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
    <div className="w-full min-h-screen flex justify-center items-center container">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(70rem_circle_at_center,white,transparent)]"
        )}
      />
      <Card className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] z-10">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your email, and we&apos;ll send you an OTP to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <div className="max-w-md p-4">
              {/* Email Step */}
              {!otpSent && (
                <form
                  onSubmit={handleSubmit(handleSendOtp)}
                  className=" space-y-5"
                >
                  <FormField
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage>{errors.email?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </form>
              )}

              {/* OTP Verification Step */}
              {otpSent && !otpVerified && (
                <form
                  onSubmit={handleSubmit(handleVerifyOtp)}
                  className=" space-y-5"
                >
                  <FormField
                    name="otp"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </form>
              )}

              {/* Password Update Step */}
              {otpVerified && (
                <form
                  onSubmit={handleSubmit(handleUpdatePassword)}
                  className=" space-y-5"
                >
                  <FormField
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Enter new password"
                          />
                        </FormControl>
                        <FormMessage>{errors.password?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Confirm your new password"
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.confirmPassword?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
