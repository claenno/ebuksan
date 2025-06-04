import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

const Intro = () => {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/dashboard"); // 👈 Change '/home' to your desired route
  };

  return (
    <div className="relative bg-login-background bg-repeat bg-cover bg-center bg-fixed w-screen h-screen overflow-hidden flex justify-center items-center px-4">
      {randomSparkles()}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-white text-center z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl font-bold py-5 mb-10"
        >
          Maligayang pagdating sa E-Buksan!
        </motion.p>

        <motion.video
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-full max-w-3xl rounded-lg shadow-xl"
          controls
          autoPlay
          muted={false}
          onEnded={handleVideoEnd} // 👈 Trigger navigation here
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </motion.div>
    </div>
  );
};

export default Intro;
