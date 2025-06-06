import React from "react";

const VideoHolder = ({
  id,
  title,
  thumbnail,
  videoUrl,
  description,
  category,
  index,
  completed,
}) => {
  return (
    <div className="relative flex flex-col justify-center items-center max-h[200px] w-40 h-auto md:w-[271px] md:h-auto md:max-h[200px] py-3 bg-gradient-to-b from-[#bd0c8b] to-[#90066a] cursor-pointer">
      {/* Badge for Completion Status */}
      <div
        className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded ${
          completed ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {completed ? "Tapos na" : "Di pa tapos"}
      </div>

      {/* Video Thumbnail */}
      <div className="flex w-[141.11px] h-[80.30px] md:w-[239px] md:h-[136px] bg-[#030303]/50 justify-center items-center">
        <img
          src={thumbnail || "https://via.placeholder.com/240"}
          alt={title}
          className="w-[141.11px] h-[80.30px] md:w-[239px] md:h-[136px] object-cover"
        />
      </div>

      {/* Video Details */}
      <div className="text-white text-left w-full px-3">
        <span className="text-white text-[10px] md:text-[17px] font-extrabold">
          Aralin {index + 1}:{" "}
        </span>
        <span className="text-white text-[10px] font-normal md:text-[17px] h-[22px] md:h-[28px] overflow-hidden whitespace-nowrap text-ellipsis">
          {title.length > 50 ? title.slice(0, 50) + "..." : title}
        </span>
        <p className="text-[#e2e2e2] text-[10px] md:text-xs font-normal mb-2">
          {description.length > 60
            ? description.slice(0, 60) + "..."
            : description}
        </p>
        <p className="text-[#e2e2e2] text-[10px] md:text-xs font-normal">
          #{category}
        </p>
      </div>
    </div>
  );
};

export default VideoHolder;
