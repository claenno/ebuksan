import React from "react";

const StudentVideoHolder = ({
  src,

  poster,
  onEnded,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <video
        controls
        src={src}
        poster={poster}
        onEnded={onEnded}
        className="w-full max-w-xs md:max-w-2xl rounded-lg shadow-lg"
        {...props}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default StudentVideoHolder;
