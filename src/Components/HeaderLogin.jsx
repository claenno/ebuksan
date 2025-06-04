import React from "react";
import { Link } from "react-router-dom";

const HeaderLogin = () => {
  return (
    <div className="md:px-20 px-5 flex w-screen h-[55px] bg-[#972F7A] justify-center items-center space-x-2 md:flex md:justify-between md:items-center md:space-x-5">
      <Link to="/login">
        <div className="flex items-center space-x-2 justify-center text-sm md:text-xl text-white">
          <img
            className="w-[40px] h-[40px]"
            src="/images/eBuksanLogo.png"
            alt="e-buksanlogo"
          />
          <p className="text-white">E-Buksan</p>
        </div>
      </Link>
    </div>
  );
};

export default HeaderLogin;
