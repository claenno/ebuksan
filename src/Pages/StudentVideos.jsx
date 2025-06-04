import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentVideoHolder from "../Components/StudentVideoHolder";

const randomSparkles = () => {
  const sparkles = [];
  for (let i = 0; i < 20; i++) {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    };
    sparkles.push(<div key={i} className="sparkle" style={style} />);
  }
  return sparkles;
};

const StudentVideos = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-login-background bg-repeat bg-cover bg-center bg-fixed w-screen h-screen overflow-hidden flex justify-center items-center px-4">
      {randomSparkles()}

      <div className="flex flex-col md:flex-row text-white space-y-4 md:space-y-0 md:space-x-4 z-10 w-full max-w-5xl">
        <StudentVideoHolder
          src="/videos/video1.mp4"
          title="Maligayang pagdating sa E-Buksan!"
          poster="/images/intro-poster.jpg"
        />
        <StudentVideoHolder
          src="/videos/video2.mp4"
          title="Maligayang pagdating sa E-Buksan!"
          poster="/images/intro-poster.jpg"
        />
        <StudentVideoHolder
          src="/videos/video3.mp4"
          title="Maligayang pagdating sa E-Buksan!"
          poster="/images/intro-poster.jpg"
        />
      </div>
    </div>
  );
};

export default StudentVideos;
