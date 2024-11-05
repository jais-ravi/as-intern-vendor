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


const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        userId: params.userId,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

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
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(70rem_circle_at_center,white,transparent)]"
        )}
      />
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
              <Button type="submit" className="mt-5">
                Verify
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyAccount;
