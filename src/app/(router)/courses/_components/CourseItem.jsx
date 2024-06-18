import Image from "next/image";
import React from "react";

const CourseItem = ({ course }) => {
  return (
    <div className="border rounded-xl hover:shadow-md hover:shadow-purple-300 hover:border-gray-300 cursor-pointer">
      <Image
        src={course?.banner?.url}
        width={500}
        height={150}
        alt="banner"
        className="rounded-t-xl"
      />
      <div className="flex flex-col gap-1 p-2">
        <h2 className="font-medium">{course.name}</h2>
        <h2 className="text-[12px] text-gray-500">{course.author}</h2>
        {course?.chapter?.length == 0 ? (
          <div className="flex gap-2">
            <Image src={"/youtube.png"} alt="youtube" width={20} height={20} />
            <h2 className="text-[14px] text-gray-400">Watch on YouTube</h2>
          </div>
        ) : (
          <div className="flex gap-2">
            <Image src={"/chapter.png"} alt="chapter" width={20} height={20} />
            <h2 className="text-[14px] text-gray-400">Chapters</h2>
          </div>
        )}
        <h2 className="text-[15px]">{course?.free ? "Free" : "Paid"}</h2>
      </div>
    </div>
  );
};

export default CourseItem;
