import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";

const CourseEnrollSection = ({ courseInfo }) => {
  const membership = false;
  const { user } = useUser();
  const router = useRouter();

  // Postting user enroll details to the backend
  const onEnrollCourse = () => {
    GlobalApi.enrollToCourse(
      courseInfo?.slug,
      user?.primaryEmailAddress?.emailAddress
    ).then((res) => {
      console.log(res);

      if (res) {
        //showing Toast message on Successfull Course Enrollment
        toast("User Enrolled Succefully!", {
          description: "Thanks 🤗 for Enrolling to this Course!",
        });
        // Redirect to Watch Course page
        router.push("/watch-course/" + res.createUserEnrollCourse.id);
      }
    });
  };
  return (
    <div className="p-3 text-center rounded-sm bg-primary">
      <h2 className="text-[20px] font-bold text-white">Enroll to the Course</h2>
      {/* User have (Membership || is free course) and Already loggedIn*/}
      {user && (membership || courseInfo.free) ? (
        <div className=" flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Enroll Now to Start Learning and Building the Project!
          </h2>
          <Button
            onClick={() => onEnrollCourse()}
            className="bg-white text-primary hover:bg-white hover:text-primary"
          >
            Enroll Now
          </Button>
        </div>
      ) : !user ? (
        <div className=" flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Enroll Now to Start Learning and Building the Project!
          </h2>
          <Link href={"/sign-in"}>
            <Button className="bg-white text-primary hover:bg-white hover:text-primary">
              Enroll Now
            </Button>
          </Link>
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
      {/*User Doesn't have Membership or Not Signup/Login yet */}
    </div>
  );
};

export default CourseEnrollSection;
