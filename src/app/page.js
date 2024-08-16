"use client";
import { UserButton, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import LandingPage from "./_components/LandingPage";

export default function Home() {
  // const router = useRouter();
  // const { user, isLoaded } = useUser();

  // useEffect(() => {
  //   if (user) {
  //     router.replace("/dashboard");
  //   } else if (isLoaded) {
  //     isLoaded && router.push("/courses");
  //   }
  // }, [user]);

  return (
    <div>
      {/* <h2>Welcome to Manish EdTech Academy</h2>
      <UserButton /> */}
      <LandingPage />
    </div>
  );
}
