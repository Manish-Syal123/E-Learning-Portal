import { Button } from "@/components/ui/button";
import { BellDot, Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="p-4 bg-white flex justify-between">
      {/* Search Bar */}
      <div className="flex gap-2 border rounded-lg p-2">
        <Search className="h-5 w-5" />
        <input
          type="text"
          placeholder="Search here......"
          className="outline-none"
        />
      </div>
      {/* Get Started button and bell icon */}
      <div className="flex items-center gap-6">
        <BellDot className="text-gray-500" />
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
