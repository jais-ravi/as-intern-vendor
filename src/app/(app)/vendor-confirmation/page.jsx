import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const VendorSuccess = () => {
  return (
    <div className="w-full h-[100vh] bg-slate-300 flex items-center justify-center">
      <Card className="w-96 h-96">
        <CardContent>
          <h1>Thank You for Registering as a Vendor!</h1>
          <p>
            We appreciate your registration and look forward to working with
            you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorSuccess;
