import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoading, setLoadingMessage }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed h-screen justify-items-center">
        <div className="flex justify-center items-center pt-[55px]"></div>
        <div className="flex flex-col justify-center items-center space-y-8 mb-10">
          <p className="text-white w-[152px] h-[21px] text-[32px] font-bold font-['Inter']">
            E-Buksan
          </p>
          <p className=" w-[324px] h-[50px] text-center text-white text-[15px] font-semibold font-['Inter']">
            Ang bagong pamamaraan ng pag-aral ng Panitikan sa mga studyante ng
            Grade 9 - 10.
          </p>
        </div>
        {/* Pass setIsLoading and setLoadingMessage to LoginForm */}
        <LoginForm
          setIsLoading={setIsLoading}
          setLoadingMessage={setLoadingMessage}
        />
      </div>

    </>
  );
};

export default LoginPage;
