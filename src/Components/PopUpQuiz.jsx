import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import QuizCompletionPopup from "./QuizCompletionPopup"; // Import the completion popup component

const PopUpQuiz = ({ questions, videoId, onQuizComplete }) => {
  const [timeLeft, setTimeLeft] = useState(30); // Initial time is 30 seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [petData, setPetData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("Time's up!");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      setTimeLeft(30); // Reset the timer for the next question
    } else {
      handleSubmit(); // Submit the quiz when all questions are answered
    }
  };

  const handleSubmit = async () => {
    if (!videoId) {
      console.error("Error: videoId is undefined.");
      alert("Invalid video. Please try again.");
      return;
    }

    const username = localStorage.getItem("username"); // Ensure this is set in your app
    if (!username) {
      console.error("Error: username is not defined.");
      alert("User is not logged in. Please log in to continue.");
      return;
    }

    const { data: existingResult, error: checkError } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("username", username)
      .eq("video_id", videoId);

    if (checkError) {
      console.error("Error checking quiz completion:", checkError.message);
      return;
    }

    if (existingResult && existingResult.length > 0) {
      alert("You have already completed this quiz!");
      navigate("/dashboard"); // Redirect to Dashboard
      return;
    }

    // Calculate the score and total experience
    let score = 0;
    let totalExperience = 0;

    questions.forEach((question, index) => {
      const userAnswer = answers[index]; // Get the user's selected answer (e.g., "Option A")
      const correctAnswerKey = `answer_${question.correct}`; // Map "a" to "answer_a", "b" to "answer_b", etc.
      const correctAnswerValue = question[correctAnswerKey]; // Get the value of the correct answer (e.g., "Option A")

      console.log(`Question ${index + 1}:`);
      console.log(`User Answer: ${userAnswer}`);
      console.log(`Correct Answer Key: ${correctAnswerKey}`);
      console.log(`Correct Answer Value: ${correctAnswerValue}`);

      if (userAnswer === correctAnswerValue) {
        console.log("Answer is correct!");
        score += 1; // Increment the score for a correct answer
        totalExperience += question.experience || 0; // Add the experience for the correct answer
      } else {
        console.log("Answer is incorrect.");
      }
    });

    console.log(`Final Score: ${score}`);
    console.log(`Total Experience: ${totalExperience}`);

    const category = questions[0]?.category || "Unknown";

    const { data, error } = await supabase
      .from("quiz_results")
      .insert([{ username, video_id: videoId, answers, category, score }], {
        returning: "representation",
      });

    if (error) {
      console.error("Error saving quiz results:", error.message);
    } else {
      console.log("Quiz results saved:", data);

      if (onQuizComplete) {
        onQuizComplete(videoId, true); // Notify the Dashboard that the quiz is completed
      }

      // Fetch pet data and show the completion popup
      const { data: petData, error: petError } = await supabase
        .from("users")
        .select("petname, petlevel, experience")
        .eq("username", username)
        .single();

      if (petError) {
        console.error("Error fetching pet data:", petError.message);
      } else {
        setPetData({ ...petData, score, totalExperience });
        setShowCompletionPopup(true); // Show the completion popup
      }
    }
  };

  const handleAddExperience = async () => {
    if (!petData) return;

    const newExperience = petData.experience + 10; // Add 10 experience points
    let newLevel = petData.petlevel;

    if (newExperience >= 100) {
      newLevel += 1; // Level up if experience exceeds threshold
    }

    const username = localStorage.getItem("username");

    try {
      const { error } = await supabase
        .from("users")
        .update({
          experience: newExperience % 100, // Reset experience if leveled up
          petlevel: newLevel,
        })
        .eq("username", username);

      if (error) throw error;

      alert("Pet experience updated successfully!");
      setShowCompletionPopup(false); // Close the popup
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      console.error("Error updating pet experience:", error.message);
    }
  };

  const currentQuestion = questions[currentQuestionIndex] || {}; // Fallback to an empty object

  if (showCompletionPopup) {
    return (
      <QuizCompletionPopup
        username={localStorage.getItem("username")}
        petData={petData}
        questions={questions} // Pass the questions array
        onClose={() => {
          setShowCompletionPopup(false);
          navigate("/dashboard"); // Redirect to the dashboard after closing the modal
        }}
        onAddExperience={handleAddExperience}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-white text-center">
        <p>No questions available for this quiz.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-[50%] max-w-[930px] flex flex-col items-center min-h-[316px] bg-gradient-to-b from-[#ff8978] via-[#fc4d9f] to-[#b834c4] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5">
        {/* Timer */}
        <div
          className="w-[100px] h-[100px] bg-no-repeat bg-center bg-contain flex items-center justify-center pt-[10px] mb-5 text-white text-4xl font-semibold"
          style={{ backgroundImage: "url('./images/clockIcon.png')" }}
        >
          <p>{timeLeft}</p>
        </div>

        {/* Question Counter */}
        <div className="flex justify-center p-2 sm:p-5">
          <p className="text-[#ffcc00] text-sm sm:text-base font-extrabold">
            Question {currentQuestionIndex + 1}/{questions.length}
          </p>
        </div>

        {/* Question Text */}
        <div className="flex justify-center items-center text-white text-lg sm:text-2xl font-semibold mt-3 sm:mt-5">
          <p>{currentQuestion.question}</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-between items-center p-2 sm:p-5 sm:px-10 text-white">
          {[
            currentQuestion.answer_a,
            currentQuestion.answer_b,
            currentQuestion.answer_c,
            currentQuestion.answer_d,
          ].map((option, optIndex) => (
            <label
              key={optIndex}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={`choice-${currentQuestionIndex}`}
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={() => handleChange(option)}
                className="appearance-none peer"
              />
              <span className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center transition-all duration-200 peer-checked:border-white peer-checked:bg-yellow-400">
                <span className="w-3 h-3 bg-white rounded-full transition-all opacity-0 duration-200 peer-checked:opacity-100"></span>
              </span>
              <span className="max-w-[400px] whitespace-normal">{option}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleNextQuestion}
          className="w-[300px] p-3 rounded-full text-white font-semibold mt-5 bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475]"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </>
  );
};

export default PopUpQuiz;
