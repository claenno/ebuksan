import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifiedNotification = () => {
  const navigate = useNavigate();
  const okayClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="pt-[100px] bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-screen justify-items-center">
        <div className="flex flex-col items-center p-5 w-[296px] h-auto md:w-[438px] md:h-[341px] rounded-[10px] bg-[url('/images/registrationFormBackground.png')] bg-repeat bg-cover bg-center bg-fixed">
          <img
            src="/images/checkIcon.png"
            alt="Check Icon"
            className="animate-pulse"
          />
          <div className="container text-center mt-[20px]">
            <p className="text-[13px] text-white md:text-xl font-extrabold">
              Hintayin na ma-verify ang iyong account
            </p>
            <p className="text-xs text-white md:text-base">
              Ang iyong account ay kasalukuyang sinusuri. Mangyaring maghintay
              ng ilang minuto at subukang muli. Kung hindi mo pa rin ma-access
              ang iyong account, mangyaring makipag-ugnayan sa aming support
              team.
            </p>
          </div>

          <button
            onClick={okayClick}
            className="mt-[25px] w-[236.97px] h-[30.01px] text-white bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475] rounded-[15px]"
          >
            Magpatuloy
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifiedNotification;
