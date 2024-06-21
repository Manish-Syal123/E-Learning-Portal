import { Lock, Play } from "lucide-react";
import React, { useState } from "react";

const CourseContentSection = ({ courseInfo, isUserAlreadyEnrolled }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="p-3 bg-white rounded-sm mt-3">
      <h2>Content/Chapters</h2>
      {courseInfo.chapter.map((item, index) => (
        <div key={index}>
          <h2
            className={`p-2 text[14px] flex justify-between items-center 
            border rounded-sm px-4 cursor-pointer m-2 
            hover:bg-gray-200 hover:text-gray-500
            ${activeIndex == index && "bg-primary text-white"}
            ${isUserAlreadyEnrolled && "hover:bg-primary hover:text-white"}
            `}
          >
            {index + 1}. {item.name}
            {activeIndex == index || isUserAlreadyEnrolled ? (
              <Play className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default CourseContentSection;
