import React from "react";
import VideoPlayer from "./VideoPlayer";
import Markdown from "react-markdown";

const CourseVideoDescription = ({
  courseInfo,
  activeChapterIndex,
  watchMode = false,
}) => {
  return (
    <div>
      <h2 className="text-[20px] font-semibold">{courseInfo?.name}</h2>
      <h2 className="text-gray-500 text-[14px] mb-3">{courseInfo?.author}</h2>

      {/* Video Player */}
      <VideoPlayer
        videoUrl={courseInfo?.chapter[activeChapterIndex]?.video?.url}
        poster={!watchMode ? courseInfo?.banner?.url : null}
      />
      {/* Description of the Video */}
      <h2 className="mt-5 text-[17px] font-semibold">
        {watchMode ? (
          <span>{courseInfo?.chapter[activeChapterIndex]?.name}</span>
        ) : (
          <span>About this Course</span>
        )}
      </h2>
      {watchMode ? (
        <Markdown className="text-[14px] font-medium mt-2 leading-7">
          {courseInfo?.chapter[activeChapterIndex]?.shortDesc}
        </Markdown>
      ) : (
        <Markdown className="text-[14px] font-medium mt-2 leading-7">
          {courseInfo?.description}
        </Markdown>
      )}
    </div>
  );
};

export default CourseVideoDescription;
