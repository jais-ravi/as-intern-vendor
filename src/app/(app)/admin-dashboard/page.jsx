"use client"
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data: session, status } = useSession();

  // Log session details and status for debugging
  // console.log("Session Data:", session);
  // console.log("Session Status:", status);

  if (status === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being fetched
  }

  if (!session) {
    return <div>You are not logged in</div>; // Handle unauthenticated users
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <p>{session.user.role}</p>
    </div>
  );
};

export default Page;
