"use client";
import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import CourseList from "./_components/CourseList";
import SideBanners from "./_components/SideBanners";

const Courses = () => {
  return (
    // When the screen size is smaller we want only one column (grid-cols-1) but if screen size is md or lg then (grid-cols-3)
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-4">
      {/* Left Container */}
      <div className="col-span-3">
        {/* Banner */}
        <WelcomeBanner />

        {/* Course List */}
        <CourseList />
      </div>

      {/* Right Container for Side Banner */}
      <div className="p-5 bg-white rounded-xl">
        <SideBanners />
      </div>
    </div>
  );
};

export default Courses;
