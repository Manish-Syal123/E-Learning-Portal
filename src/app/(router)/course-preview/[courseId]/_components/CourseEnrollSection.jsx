import { Button } from "@/components/ui/button";
import React from "react";

const CourseEnrollSection = () => {
  return (
    <div className="p-3 text-center rounded-sm bg-primary flex flex-col gap-3">
      <h2 className="text-[20px] font-bold text-white">Enroll to the Course</h2>
      {/* User have Membership and Already loggedIn */}
      <div>
        <h2 className="text-white font-light">
          Enroll Now to Start Learning and Building the Project
        </h2>
        <Button className="bg-white text-primary hover:bg-white hover:text-primary">
          Enroll Now
        </Button>
      </div>

      {/* User Doesn't have Membership or Not Signup/Login yet */}
      <div></div>
    </div>
  );
};

export default CourseEnrollSection;
