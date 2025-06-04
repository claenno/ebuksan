// ...existing code...
import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

const AdminQuestions = () => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState(0);
  const [correct, setCorrect] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  // Add these states for quiz by category
  const [showQuizQuestionsModal, setShowQuizQuestionsModal] = useState(false);
  const [quizCategory, setQuizCategory] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.from("questions").select("*");
        if (error) throw error;
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleDeleteClick = (id) => {
    setEditingQuestionId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("id", editingQuestionId);
      if (error) throw error;
      setQuestions(questions.filter((q) => q.id !== editingQuestionId));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEditClick = (question) => {
    setQuestion(question.question);
    setAnswerA(question.answer_a);
    setAnswerB(question.answer_b);
    setAnswerC(question.answer_c);
    setAnswerD(question.answer_d);
    setCategory(question.category);
    setExperience(question.experience);
    setCorrect(question.correct);
    setEditingQuestionId(question.id);
    setShowQuizModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuestionId) {
        const { error } = await supabase
          .from("questions")
          .update({
            question,
            answer_a: answerA,
            answer_b: answerB,
            answer_c: answerC,
            answer_d: answerD,
            category,
            experience,
            correct,
          })
          .eq("id", editingQuestionId);
        if (error) throw error;

        setQuestions(
          questions.map((q) =>
            q.id === editingQuestionId
              ? {
                  ...q,
                  question,
                  answer_a: answerA,
                  answer_b: answerB,
                  answer_c: answerC,
                  answer_d: answerD,
                  category,
                  experience,
                  correct,
                }
              : q
          )
        );
      } else {
        const { data, error } = await supabase
          .from("questions")
          .insert([
            {
              question,
              answer_a: answerA,
              answer_b: answerB,
              answer_c: answerC,
              answer_d: answerD,
              category,
              experience,
              correct,
            },
          ])
          .select(); // Explicitly request the inserted rows
        if (error) throw error;

        // Ensure data is iterable before spreading
        if (Array.isArray(data)) {
          setQuestions([...questions, ...data]);
        } else {
          console.error("Unexpected data format:", data);
          alert("Failed to save question ❌");
          return;
        }
      }

      alert("Question saved successfully 🎉");
      setShowQuizModal(false);
      setEditingQuestionId(null);
      setQuestion("");
      setAnswerA("");
      setAnswerB("");
      setAnswerC("");
      setAnswerD("");
      setCategory("");
      setExperience(0);
      setCorrect("");
    } catch (error) {
      console.error("Error saving question:", error.message);
      alert("Failed to save question ❌");
    }
  };

  // Handler for showing quiz questions by category
  const handleShowQuizQuestions = (category) => {
    setQuizCategory(category);
    setFilteredQuestions(questions.filter((q) => q.category === category));
    setShowQuizQuestionsModal(true);
  };

  return (
    <>
      <button
        onClick={() => setShowQuizModal(true)}
        className="w-[132px] h-10 bg-[#81c548] rounded-[5px] border border-black text-white text-base font-semibold"
      >
        Add Quiz
      </button>

      {/* Render a Quiz button for each unique category */}
      <div className="flex flex-wrap gap-2 my-4">
        {[...new Set(questions.map((q) => q.category))].map(
          (cat) =>
            cat && (
              <button
                key={cat}
                onClick={() => handleShowQuizQuestions(cat)}
                className="w-[132px] h-10 bg-blue-600 rounded-[5px] border border-black text-white text-base font-semibold"
              >
                Quiz: {cat}
              </button>
            )
        )}
      </div>

      {questions.map((q, index) => (
        <div
          key={index}
          className="w-[376px] min-h-[59px] bg-white flex rounded-[5px] border items-center justify-center border-black p-2"
        >
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold">{q.question}</p>
            <p className="whitespace-normal break-words">{q.category}</p>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center">
            <button
              className="w-16 h-[30px] bg-[#ffcc00] rounded-[5px]"
              onClick={() => handleEditClick(q)}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(q.id)}
              className="w-16 h-[30px] bg-[#e63363] rounded-[5px]"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal to show all questions for a selected category */}
      {showQuizQuestionsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg p-6 w-[700px] max-h-[90vh] overflow-y-auto bg-white">
            <h2 className="text-xl font-bold mb-4">
              Quiz Questions for: {quizCategory}
            </h2>
            {filteredQuestions.length === 0 ? (
              <p>No questions found for this category.</p>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div key={q.id} className="mb-4 p-4 border rounded">
                  <p className="font-semibold">{q.question}</p>
                  <ul className="list-disc ml-6">
                    <li>A: {q.answer_a}</li>
                    <li>B: {q.answer_b}</li>
                    <li>C: {q.answer_c}</li>
                    <li>D: {q.answer_d}</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Correct: {q.correct}
                  </p>
                </div>
              ))
            )}
            <button
              type="button"
              onClick={() => setShowQuizQuestionsModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showQuizModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg p-6 w-[700px] max-h-[90vh] overflow-y-auto bg-white">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="question"
                >
                  Question
                </label>
                <input
                  id="question"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="answerA"
                >
                  Answer A
                </label>
                <input
                  id="answerA"
                  type="text"
                  value={answerA}
                  onChange={(e) => setAnswerA(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="answerB"
                >
                  Answer B
                </label>
                <input
                  id="answerB"
                  type="text"
                  value={answerB}
                  onChange={(e) => setAnswerB(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="answerC"
                >
                  Answer C
                </label>
                <input
                  id="answerC"
                  type="text"
                  value={answerC}
                  onChange={(e) => setAnswerC(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="answerD"
                >
                  Answer D
                </label>
                <input
                  id="answerD"
                  type="text"
                  value={answerD}
                  onChange={(e) => setAnswerD(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="experience"
                >
                  Experience
                </label>
                <input
                  id="experience"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(Number(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="correct"
                >
                  Correct Answer
                </label>
                <input
                  id="correct"
                  type="text"
                  value={correct}
                  onChange={(e) => setCorrect(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#90066a] p-5 rounded-[5px] text-white">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="w-14 h-[30px] bg-[#e63363] rounded-[5px] px-1"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="w-14 h-[30px] bg-[#ffcc00] rounded-[5px] px-1"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminQuestions;
// ...existing code...
