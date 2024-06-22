"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseVideoDescription from "../../course-preview/[courseId]/_components/CourseVideoDescription";
import CourseContentSection from "../../course-preview/[courseId]/_components/CourseContentSection";
import { toast } from "sonner";

const WatchCourse = ({ params }) => {
  const [courseInfo, setCourseInfo] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [completedChapter, setCompletedChapter] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (params && user) {
      getUserEnrolledCourseDetails();
    }
  }, [params && user]);

  //Get user Enrolled Course Details by id and useremail
  const getUserEnrolledCourseDetails = () => {
    try {
      GlobalApi.getUserEnrolledCourseDetails(
        params.enrollId,
        user?.primaryEmailAddress?.emailAddress
      ).then((res) => {
        setCompletedChapter(res.userEnrollCourses[0].completedChapter); // storing the list of chapters which has been completed
        setCourseInfo(res.userEnrollCourses[0].courseList || []);
      });
    } catch (error) {
      console.log(
        "Error in fetching enrolledCourse Details for watch-course :",
        error
      );
    }
  };

  // this will Save the Completed Chapter Id
  const onChapterComplete = (chapterId) => {
    GlobalApi.markChapterCompleted(params.enrollId, chapterId).then((res) => {
      console.log(res);

      if (res) {
        toast("Chapter Marked as Completed!");
        getUserEnrolledCourseDetails(); //now it will fetch the latest data and to update the frontend UI information based on updated fetched data
      }
    });
  };

  return (
    courseInfo.name && (
      <div>
        <div className="grid grid-cols-1  md:grid-cols-3 p-5 gap-3">
          {/* Title , Video and Description on left side  */}
          <div className="col-span-2 bg-white p-3">
            <CourseVideoDescription
              courseInfo={courseInfo}
              activeChapterIndex={activeChapterIndex}
              watchMode={true}
              setChapterCompleted={(chapterId) => onChapterComplete(chapterId)}
            />
          </div>
          {/* Course Content like chapters section on right side */}
          <div>
            <CourseContentSection
              courseInfo={courseInfo}
              isUserAlreadyEnrolled={true}
              watchMode={true}
              setActiveChapterIndex={(index) => setActiveChapterIndex(index)}
              completedChapter={completedChapter}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default WatchCourse;
