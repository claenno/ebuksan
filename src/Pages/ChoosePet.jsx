// Language: jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChoosePet = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [petId, setPetId] = useState(0);

  const handlePetSelect = (pet, index) => {
    setSelectedPet(pet);
    setPetId(index);
  };

  const handleConfirmation = () => {
    navigate("/petName", {
      state: {
        petId: petId,
        petImage: `/images/${selectedPet}`,
      },
    });
  };

  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed h-screen justify-items-center pt-[100px]">
        <div className="flex flex-col items-center justify-center bg-[url('/images/registrationFormBackground.png')] bg-repeat bg-center rounded-[10px]">
          <div className="w-[330px] h-[267px] md:w-[1036px] md:h-[368px]">
            <p className="text-white md:text-xl text-sm font-extrabold text-center p-10">
              Choose your Pet
            </p>
            <div className="flex space-x-5 md:space-x-28 items-center justify-center">
              {["pet1.png", "pet2.png", "pet3.png"].map((pet, index) => (
                <div
                  key={index}
                  className={`justify-center flex w-[68.31px] h-[65.51px] md:w-[139.89px] md:h-[134.16px] bg-white rounded-[500px] cursor-pointer ${
                    selectedPet === pet ? "border-4 border-yellow-500" : ""
                  }`}
                  onClick={() => handlePetSelect(pet, index)}
                >
                  <img src={`/images/${pet}`} alt={pet} />
                </div>
              ))}
            </div>
            <div className="flex space-x-5 justify-center p-10 text-white">
              <button
                onClick={() => setModalOpen(true)}
                disabled={!selectedPet}
                className={`w-[153px] h-[27px] md:w-[335.74px] md:h-[37.95px] text-sm md:text-base rounded-[15px] ${
                  selectedPet
                    ? "bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>

          <Confirmation
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmation}
            selectedPet={selectedPet}
          />
        </div>
      </div>
    </>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  );
};

const Confirmation = ({ isOpen, onClose, onConfirm, selectedPet }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="justify-center items-center space-y-4 w-[333px] h-[200px] bg-gradient-to-b from-[#ff4fa2] to-[#ec3893] rounded-[10px] p-4">
        <div className="flex justify-center items-center pt-3">
          <img src="/images/questionMarkIcon.png" alt="question mark" />
        </div>
        <div className="text-center text-white text-sm font-bold">
          <p>Are you sure you want to choose this pet?</p>
        </div>

        <div className="flex justify-between px-16">
          <img onClick={onClose} src="/images/smallExIcon.png" alt="cancel" />
          <img
            onClick={onConfirm}
            src="/images/smallCheckIcon.png"
            alt="confirm"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChoosePet;
