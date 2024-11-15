import React from "react";

const FeaturedSection = () => {
  return (
    <div className="container py-10 mx-auto max-w-full sm:max-w-[90%] lg:max-w-[80%] space-y-4">
      <h1 className="text-2xl font-bold">Sell on Name</h1>
      <p className="text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. From startups
        to enterprises, everyone benefits from our platform. Partnering with us
        is simple and can lead to substantial growth in your business with
        minimal effort and investment required.
      </p>
      <p className="text-base">
        The Vendor Access Platform caters to partners already collaborating with
        us and those aspiring to join as reliable vendors and distributors in
        our network.
      </p>
      <p className="text-base">
        If you are already registered with AcmeCorp and have received a portal
        username and password, please log in to update your account details.
        Ensure that your information is current at all times. If you are a new
        user wishing to register with us, please use the Sign-Up link to create
        an account. Your completed registration will be added to our database,
        and we will use this information to contact you regarding any inquiries
        or updates. The registration process will only be finalized upon
        verification by AcmeCorp, and you will be notified via email or a call
        from our Registration Team. Completion of the registration does not
        guarantee any specific benefits but increases your visibility to
        potential clients and account managers.
      </p>
      <p className="text-base">
        Thank you for registering with us and we will connect with you as soon
        as we receive matching product queries for your portfolio.
      </p>
    </div>
  );
};

export default FeaturedSection;
