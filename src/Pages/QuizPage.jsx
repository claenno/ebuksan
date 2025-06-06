import React, { useState, useEffect } from "react";
import PopUpQuiz from "../Components/PopUpQuiz";

const QuizPage = () => {
  const [timeLeft, setTimeLeft] = useState(30); // Paunang oras ay 30 segundo

  useEffect(() => {
    // Tumigil kung ang timer ay umabot na sa 0
    if (timeLeft === 0) {
      // Maaari kang magdagdag ng lohika dito kapag tapos na ang oras
      console.log("Tapos na ang oras!");
      return;
    }

    // I-set ang interval ng timer
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); // Bawasan ng 1 segundo
    }, 1000);

    // Linisin ang interval kapag na-unmount o nagbago ang timeLeft
    return () => clearInterval(timerId);
  }, [timeLeft]); // I-re-run ang effect kapag nagbago ang timeLeft

  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-screen justify-items-center px-5 pt-7 md:pt-10">
        <PopUpQuiz />
      </div>
    </>
  );
};

export default QuizPage;
