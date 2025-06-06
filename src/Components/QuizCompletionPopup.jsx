import React, { useState, useEffect } from "react";
import supabase from "../../supabase";

const QuizCompletionPopup = ({ username, petData, questions, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [expNeeded, setExpNeeded] = useState(0);

  useEffect(() => {
    const fetchExpNeeded = async () => {
      try {
        const { data, error } = await supabase
          .from("levelexprequired")
          .select("exp_need")
          .eq("level", petData.petlevel);

        if (error) throw error;

        if (!data || data.length === 0) {
          console.error(
            `No rows returned for the specified level: ${petData.petlevel}`
          );
          setExpNeeded(100); // Default to 100 if no rows are returned
        } else {
          setExpNeeded(data[0].exp_need); // Use the first row returned
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching experience needed:", error.message);
        setExpNeeded(100); // Default to 100 in case of an error
        setLoading(false);
      }
    };

    fetchExpNeeded();
  }, [petData.petlevel]);

  const handleAddExperience = async () => {
    if (!petData) return;

    const newExperience = petData.experience + petData.totalExperience; // Add total experience from the quiz
    let newLevel = petData.petlevel;

    // Level up if experience exceeds the required threshold
    if (newExperience >= expNeeded) {
      newLevel += 1;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          experience: newExperience % expNeeded, // Reset experience if leveled up
          petlevel: newLevel,
        })
        .eq("username", username);

      if (error) throw error;

      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating pet experience:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-w-[50%] max-w-[930px] flex flex-col items-center min-h-auto bg-gradient-to-b bg-[#b834c4] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5">
      <p className="text-white font-bold">Nakuha mo ang iskor na:</p>
      <p className="text-yellow-400 text-[38px] font-bold">
        {petData.score}/{questions.length}
      </p>
      <p className="text-white text-[12px]">Tanong</p>
      <p className="text-[18px] text-yellow-400 my-3">
        +{petData.totalExperience} EXP
      </p>
      <p className="text-white text-[12px]">
        Nabuksan mo na ang susunod na aralin!
      </p>
      <div>
        <button
          onClick={handleAddExperience}
          className="w-[300px] p-3 rounded-full text-white font-semibold mt-5 bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475]"
        >
          Magpatuloy
        </button>
      </div>
    </div>
  );
};

export default QuizCompletionPopup;
