import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-screen justify-items-center">
        <Link to="/">
          <div className="flex items-center text-white md:h-[42px] md:w-[42px] absolute md:top-[90px] md:left-20 h-[21px] w-[21px] top-[80px] left-10">
            <img src="/images/backIcon.png" alt="Bumalik" />
            <p className="pl-3">Bumalik</p>
          </div>
        </Link>
        <div className="flex justify-center items-center pt-[75px]">
          <RegistrationForm />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
