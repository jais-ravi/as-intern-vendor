"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifyCodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { useState } from "react";
import { Loader2 } from "lucide-react";


const VerifyAccount = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        userId: params.userId,
        code: data.code,
      });
      // response wla things may be  
      toast({
        title: "Success",
        description: response.data.message,
      });
      setIsSubmitting(false);
      router.replace("/vendor-confirmation");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Verification Failed",
          description:
            error.response?.data.message ??
            "An error occurred. Please try again.",
          variant: "destructive",
        });
      } else {
        console.error("Error in verification process:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(70rem_circle_at_center,white,transparent)]"
        )}
      />
      <div className="container min-h-screen flex justify-center items-center">
        <Card className="z-10">
          <CardHeader>
            <CardTitle>Verify Your Account</CardTitle>
            <CardDescription>
              Enter the verification code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full mt-8"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyAccount;
