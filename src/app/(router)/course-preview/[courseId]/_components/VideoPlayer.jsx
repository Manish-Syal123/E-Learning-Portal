import React from "react";

const VideoPlayer = ({ videoUrl, poster }) => {
  return (
    <video
      width={1000}
      height={250}
      controls
      poster={poster}
      className="rounded-sm"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
