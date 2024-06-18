"use client";
import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import CourseList from "./_components/CourseList";

const Courses = () => {
  return (
    // When the screen size is smaller we want only one column (grid-cols-1) but if screen size is md or lg then (grid-cols-3)
    <div className="grid grid-cols-1 md:grid-cols-4 p-5">
      {/* Left Container */}
      <div className="col-span-3">
        {/* Banner */}
        <WelcomeBanner />

        {/* Course List */}
        <CourseList />
      </div>

      {/* Right Container */}
      <div>Right section</div>
    </div>
  );
};

export default Courses;
