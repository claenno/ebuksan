import React from "react";

const QuizCompletedModal = ({ onClose }) => {
  return (
    <div className="sm:min-w-[200px] sm:max-w-[930px] min-w-[150px] max-w-[300px]  flex flex-col items-center min-h-auto bg-gradient-to-b from-[#ff8978] via-[#fc4d9f] to-[#b834c4] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 m-4 sm:p-5">
      <p className="text-white text-lg sm:text-2xl font-semibold">
        Natapos mo na ang pagsusulit!
      </p>
      <p className="text-white text-sm mt-3">
        Salamat sa iyong pagsagot. Maaari ka nang magpatuloy sa susunod na
        aralin.
      </p>
      <button
        onClick={onClose}
        className="max-w-[300px] min-w-[200px] p-3 rounded-full text-white font-semibold mt-5 bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475]"
      >
        Magpatuloy
      </button>
    </div>
  );
};

export default QuizCompletedModal;
