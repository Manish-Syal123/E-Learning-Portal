import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";

const Courses = () => {
  return (
    // When the screen size is smaller we want only one column (grid-cols-1) but if screen size is md or lg then (grid-cols-3)
    <div className="grid grid-cols-1 md:grid-cols-3 p-5">
      {/* Left Container */}
      <div className="col-span-2">
        {/* Banner */}
        <WelcomeBanner />
      </div>

      {/* Right Container */}
      <div>Right section</div>
    </div>
  );
};

export default Courses;
