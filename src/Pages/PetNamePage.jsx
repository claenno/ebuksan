// Language: jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../../supabase";

const PetNamePage = () => {
  const { state } = useLocation();
  const { petId, petImage } = state;
  const [petName, setPetName] = useState("");
  const navigate = useNavigate();

  const handleConfirmation = async () => {
    const username = localStorage.getItem("username");
    try {
      // Use matching column names from your table
      const { error } = await supabase
        .from("users")
        .update({ petid: petId, petname: petName, haspet: true })
        .eq("username", username);

      if (error) {
        console.error("Error updating pet:", error);
      } else {
        navigate("/intro");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed h-screen justify-items-center pt-[100px]">
        <div className="gap-6 flex flex-col items-center w-[287.30px] h-[263px] rounded-[10px] md:w-[402px] md:h-[368px] bg-[url('/images/registrationFormBackground.png')] bg-repeat bg-center">
          <div className="text-center text-white text-sm font-extrabold mt-7">
            <p>Name your Pet</p>
          </div>
          <div className="w-[68.31px] h-[65.51px] bg-white rounded-[500px] justify-center items-center flex">
            <img src={petImage} alt="pet" />
          </div>
          <div>
            <input
              className="w-[251px] h-[34px] bg-white text-[13px] font-medium text-center"
              type="text"
              placeholder="Create a unique name for your pet"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              onClick={handleConfirmation}
              disabled={!petName}
              className={`w-[153px] h-[27px] text-white bg-gradient-to-r mb-6 from-[#e48335] via-[#f97a53] to-[#ff6475] rounded-[15px] ${
                !petName && "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetNamePage;
