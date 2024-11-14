import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "@/components/ui/separator"


const VendorSuccess = () => {
  return (
    <div className="w-full h-[100vh]  flex items-center justify-center">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(70rem_circle_at_center,white,transparent)]"
        )}
      />
      <Card className="w-96 z-10 text-center">
        <CardHeader>
          <CardTitle  className="text-2xl">Congratulations 🎉</CardTitle>
          <CardDescription>
            You have successfully registered as a vendor. We're excited to have
            you on board!
          </CardDescription>
        </CardHeader>
        <CardContent>
          Please note that your account is pending approval from our admin team.
          Once approved, you’ll be able to access all vendor features and start
          listing your products.
        </CardContent>
        <div className="flex justify-center">
        <Separator className="w-[90%]"/>
        </div>
        <CardFooter className="mt-3">
        <CardDescription>
          If you have any questions in the meantime, feel free to reach out to
          our support team. Thank you for your patience and welcome aboard!
        </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VendorSuccess;
