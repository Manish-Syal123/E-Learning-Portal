"use client";
import React, { useEffect, useState } from "react";
import CourseVideoDescription from "./_components/CourseVideoDescription";
import GlobalApi from "@/app/_utils/GlobalApi";
import CourseEnrollSection from "./_components/CourseEnrollSection";
import CourseContentSection from "./_components/CourseContentSection";
import { useUser } from "@clerk/nextjs";

const CoursePreview = ({ params }) => {
  const [courseInfo, setCourseInfo] = useState();
  const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (params?.courseId) {
      getCourseInfoById();
    }
  }, [params]);

  useEffect(() => {
    if (courseInfo && user) {
      checkUserEnrolledToCourse();
    }
  }, [courseInfo, user]);

  // use to get course info by slug name
  const getCourseInfoById = async () => {
    try {
      const res = await GlobalApi.getCourseById(params?.courseId);
      setCourseInfo(res?.courseList);
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
  };

  // To Check if user already enrolled to the course
  const checkUserEnrolledToCourse = async () => {
    try {
      const res = await GlobalApi.checkUserEnrolledToCourse(
        courseInfo?.slug,
        user?.primaryEmailAddress?.emailAddress
      );
      if (res?.userEnrollCourses?.length > 0) {
        console.log("User Enrolled Courses:", res.userEnrollCourses);
        setIsUserAlreadyEnrolled(res?.userEnrollCourses[0]?.id);
      }
    } catch (error) {
      console.error("Error checking user enrollment:", error);
    }
  };

  // console.log("isUserAlreadyEnrolled:", isUserAlreadyEnrolled);

  return (
    courseInfo && (
      <div className="grid grid-cols-1  md:grid-cols-3 p-5 gap-3">
        {/* Title , Video and Description on left side  */}
        <div className="col-span-2 bg-white p-3">
          <CourseVideoDescription courseInfo={courseInfo} />
        </div>
        {/* Course Content like chapters and Enrolment section on right side */}
        <div>
          <CourseEnrollSection
            courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled}
          />
          <CourseContentSection
            courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled}
          />
        </div>
      </div>
    )
  );
};

export default CoursePreview;
