"use client";

import BankDetailsForm from "@/components/bankDetails/BankDetailsForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";


const Page = () => {
  const [user, setUser] = useState(null); // State to store fetched vendor details
  const [VendorData, setVendorData] = useState({
    name: "",
    email: "",
    contact: "",
    reference_id: "",
  });
  const [message, setMessage] = useState(""); // State to show messages
  const [loading, setLoading] = useState(false); // State to handle loading
  const { data: session } = useSession();
  const vendor = session?.user; // Vendor info from session

  // Function to fetch vendor details and register the vendor
  const vendorDetails = async () => {
    setLoading(true); // Start loading

    try {
      if (!vendor || !vendor._id) {
        console.error("Vendor ID not found in session");
        return;
      }

      const vendorId = vendor._id;

      // Fetch vendor details
      const response = await axios.get(
        `/api/vendor-details?vendorId=${vendorId}`
      );

      if (response.data.success) {
        // Update the user state with fetched details
        setUser(response.data.user);
        // const username = response.data.user.firstName + " " + response.data.user.lastName;
        // console.log(username)
        // setVendorData({
        //   name: response.data.user.firstName,
        //   email: response.data.user.email,
        //   contact: response.data.user.contactNumber,
        //   reference_id: response.data.user._id,
        // });

        // Proceed to register the vendor once the details are fetched
        const registerResponse = await fetch("/api/register-vendor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:
              response.data.user.firstName + " " + response.data.user.lastName,
            email: response.data.user.email,
            contact: response.data.user.contactNumber,
            reference_id: response.data.user._id,
          }),
        });

        const registerData = await registerResponse.json();
        console.log(registerData.data);
        if (registerData.success) {
          setMessage("Vendor registered successfully!");
        } else {
          setMessage("Failed to register vendor.");
        }
      } else {
        console.error("Error fetching vendor details:", response.data.message);
        setMessage("Error fetching vendor details.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while processing the request.");
    } finally {
      setLoading(false); // Stop loading after the process
    }
  };

  return (
    <div>
      <div>
        <Button onClick={vendorDetails} disabled={loading}>
          {loading ? "Processing..." : "Fetch & Register Vendor"}
        </Button>
        {message && <p>{message}</p>}{" "}
        {/* Show the message after the API call */}
      </div>

      <div>
        <BankDetailsForm />
      </div>
    </div>
  );
};

export default Page;
