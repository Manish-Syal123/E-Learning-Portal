import { Button } from "@/components/ui/button";
import React from "react";

const CourseEnrollSection = () => {
  const membership = false;
  return (
    <div className="p-3 text-center rounded-sm bg-primary">
      <h2 className="text-[20px] font-bold text-white">Enroll to the Course</h2>
      {/* User have Membership and Already loggedIn */}
      {membership ? (
        <div className=" flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Enroll Now to Start Learning and Building the Project!
          </h2>
          <Button className="bg-white text-primary hover:bg-white hover:text-primary">
            Enroll Now
          </Button>
        </div>
      ) : (
        <div className=" flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Buy Monthly Membership and get access to All Courses
          </h2>
          <Button className="bg-white text-primary hover:bg-white hover:text-primary text-wrap">
            Buy Membership Just $2.99
          </Button>
        </div>
      )}
      {/*About section User Doesn't have Membership or Not Signup/Login yet */}
    </div>
  );
};

export default CourseEnrollSection;
