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
    <div className="min-w-[50%] max-w-[930px] flex flex-col items-center min-h-[316px] bg-gradient-to-b from-[#ff8978] via-[#fc4d9f] to-[#b834c4] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5">
      <p className="text-white text-lg sm:text-2xl font-semibold">
        Natapos mo na ang pagsusulit!
      </p>
      <p className="text-white text-sm mt-3">Pet Name: {petData.petname}</p>
      <p className="text-white text-sm">Current Level: {petData.petlevel}</p>
      <p className="text-white text-sm">
        Current Experience: {petData.experience}/{expNeeded}
      </p>
      <p className="text-white text-sm mt-3">
        Quiz Score: {petData.score}/{questions.length}
      </p>
      <p className="text-white text-sm">
        Total Experience Earned: {petData.totalExperience}
      </p>
      <button
        onClick={handleAddExperience}
        className="w-[300px] p-3 rounded-full text-white font-semibold mt-5 bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475]"
      >
        Magpatuloy
      </button>
    </div>
  );
};

export default QuizCompletionPopup;
