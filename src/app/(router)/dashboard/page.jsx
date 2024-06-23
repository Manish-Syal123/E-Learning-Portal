"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import SideBanners from "../courses/_components/SideBanners";
import WelcomeBannerDashboard from "./_components/WelcomeBannerDashboard";
import InProgressCourseList from "./_components/InProgressCourseList";
import GlobalApi from "@/app/_utils/GlobalApi";

const Dashboard = () => {
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  useEffect(() => {
    if (user) {
      getAllUserEnrollCourses();
    }
  }, [user]);

  // Get all user enrolled course list
  const getAllUserEnrollCourses = () => {
    try {
      GlobalApi.getUserAllEnrolledCourseList(
        user?.primaryEmailAddress?.emailAddress
      ).then((res) => {
        console.log(res);
        setUserEnrolledCourses(res.userEnrollCourses);
      });
    } catch (error) {
      console.log(
        "Error Fetching user enrolled courses in dashboard : ",
        error
      );
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-4">
      {/* Left Container */}
      <div className="col-span-3">
        {/* Banner */}
        <WelcomeBannerDashboard user={user} />

        {/* In Progress Course Lists */}
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>

      {/* Right Container for Side Banner */}
      <div className="p-5 bg-white rounded-xl">
        <SideBanners />
      </div>
    </div>
  );
};

export default Dashboard;
