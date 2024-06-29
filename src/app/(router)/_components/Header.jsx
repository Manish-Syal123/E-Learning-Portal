"use client";
import { UserMemberContext } from "@/app/_context/UserMemberContext";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { BellDot, Search } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { user, isLoaded } = useUser();
  const { search, setSearch } = useContext(UserMemberContext);

  return (
    <div className="p-4 bg-white flex justify-between">
      {/* Search Bar */}
      <div className="flex gap-2 border rounded-lg p-2">
        <Search className="h-5 w-5" />
        <input
          type="text"
          placeholder="Search for courses......"
          className="outline-none"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {/* Get Started button and bell icon */}
      <div className="flex items-center gap-6">
        <BellDot className="text-gray-500" />
        {isLoaded && user ? (
          <UserButton afterSignOutUrl="/courses" />
        ) : (
          <Link href={"/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
