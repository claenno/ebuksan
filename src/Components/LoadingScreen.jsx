import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50"
      style={{
        backgroundImage: "url('./images/loadingBG.png')",
        backgroundSize: "cover", // Ensures the image covers the entire screen
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-white text-2xl font-bold text-center flex flex-col items-center justify-center"
      >
        <img
          className="animate-spin w-16 h-16 mb-4" // Adjust size and margin as needed
          src="./images/loadingIcon.png"
          alt="loading"
        />
        <p>{message}</p> {/* Dynamic message */}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;