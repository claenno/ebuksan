import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const MenuBar = () => {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const powePointClick = () => {
    navigate("/powerPoint");
  };
  return (
    <>
      <div className="flex justify-between items-center pt-5">
        {/* Left side menu items */}
        <div className="flex space-x-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "w-[46px] h-[42px] bg-[#ffcc00] flex items-center justify-center md:w-[202px] md:h-[42px] md:justify-start rounded-[10px] md:px-5"
                : "w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] md:justify-start rounded-[10px] md:px-5"
            }
          >
            <img src="images/cameraIcon.png" alt="video" />
            <p className="hidden md:block md:font-semibold md:pl-8">
              Mga Bidyo
            </p>
          </NavLink>
          <NavLink
            to="/powerPoint"
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
            to="/word"
            className={({ isActive }) =>
              isActive
                ? "w-[46px] h-[42px] bg-[#ffcc00] flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
                : "w-[46px] h-[42px] bg-white flex items-center justify-center md:w-[202px] md:h-[42px] rounded-[10px]"
            }
          >
            <img src="images/wordIcon.png" alt="dcs" className="md:pr-4" />
            <p className="hidden md:block md:pr-12 md:font-semibold">
              Dokumento
            </p>
          </NavLink>
        </div>

        <div className="relative left-3">
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
            onClick={() => {
              setExpand(true); // Expand the input field
              document.querySelector('input[type="search"]').focus(); // Focus the input field
            }}
          >
            <img src="images/searchIcon.png" alt="search" className="w-4 h-4" />
          </button>
          <input
            type="search"
            onFocus={() => setExpand(true)}
            onBlur={() => setExpand(false)}
            className={`transition-all duration-300 h-[35.85px] bg-white rounded-[10px] px-2 pl-8 outline-none origin-right ${
              expand ? "w-[150px]" : "w-[35px]"
            }`}
            placeholder={expand ? "Search..." : ""}
          />
        </div>
      </div>
    </>
  );
};

export default MenuBar;
