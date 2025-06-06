import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UploadButtons from "./UploadButtons"; // Import the UploadButtons component

const AdminMenuBar = () => {
  const [expand, setExpand] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false); // State to control modal visibility

  return (
    <>
      <div className="h-[115px] bg-[#860074] flex items-center justify-center">
        <div className="flex justify-between items-center">
          {/* Left side menu items */}
          <div className="flex space-x-2">
            <NavLink
              to="/adminDashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "w-[46px] h-[42px] bg-[#ffcc00] flex items-center justify-center md:w-[202px] md:h-[42px] md:justify-start rounded-[10px] md:px-5"
                  : "w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] md:justify-start rounded-[10px] md:px-5"
              }
            >
              <img src="images/cameraIcon.png" alt="video" />
              <p className="hidden md:block md:font-semibold md:pl-5">
                Mga Bidyo
              </p>
            </NavLink>
            <NavLink
              to="/adminPowerPoint"
              className={({ isActive }) =>
                isActive
                  ? "w-[46px] h-[42px] bg-[#ffcc00] flex items-center justify-center md:w-[202px] md:h-[42px] md:justify-start md:px-5 rounded-[10px]"
                  : "w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] md:justify-start md:px-5 rounded-[10px]"
              }
            >
              <img src="images/powerPointIcon.png" alt="ppt" />
              <p className="hidden md:block md:pl-5 md:font-semibold">
                PowerPoints
              </p>
            </NavLink>
            <NavLink
              to="/adminDocument"
              className={({ isActive }) =>
                isActive
                  ? "w-[46px] h-[42px] bg-[#ffcc00] flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
                  : "w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
              }
            >
              <img src="images/wordIcon.png" alt="dcs" className="md:pr-5" />
              <p className="hidden md:block md:pr-12 md:font-semibold">
                Dokumento
              </p>
            </NavLink>
            {/* Upload Button */}
            <button
              onClick={() => setShowUploadModal(true)} // Open the modal
              className="w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
            >
              <img src="images/upload.png" alt="upload" className="md:pr-5" />
              <p className="hidden md:block md:pr-12 md:font-semibold">
                Mag-Upload
              </p>
            </button>

            <NavLink
              to="/adminusers"
              className={({ isActive }) =>
                isActive
                  ? "w-[46px] h-[42px] bg-[#ffcc00] flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
                  : "w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
              }
            >
              <img src="images/graduated.png" alt="" className="md:pr-5" />
              <p className="hidden md:block md:pr-12 md:font-semibold">
                Studyante
              </p>
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="relative h-[35.85px] ml-2">
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              onClick={() =>
                document.querySelector('input[type="search"]').focus()
              }
            >
              <img
                src="images/searchIcon.png"
                alt="search"
                className="w-4 h-4"
              />
            </button>
            <input
              type="search"
              onFocus={() => setExpand(true)}
              onBlur={() => setExpand(false)}
              className={`transition-all duration-300 h-[35.85px] bg-white rounded-[10px] px-2 pl-8 outline-none ${
                expand ? "w-[150px]" : "w-[35px]"
              }`}
              placeholder={expand ? "Search..." : ""}
            />
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg p-6 w-[700px] max-h-[90vh] bg-white">
            {/* Pass the current page and onClose function to the UploadButtons component */}
            <UploadButtons onClose={() => setShowUploadModal(false)} />{" "}
            {/* Use the UploadButtons component */}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMenuBar;
