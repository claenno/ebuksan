import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import Modal from "../Components/Modal";
import PopUpQuiz from "../Components/PopUpQuiz";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false); // State for completed modal
  const [questions, setQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track quiz completion
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedVideo = state?.selectedVideo;
  const onQuizComplete = state?.onQuizComplete; // Retrieve the callback

  useEffect(() => {
    console.log("Napiling video:", selectedVideo); // Debugging

    if (!selectedVideo || !selectedVideo.id) {
      console.error("Ang napiling video ay walang ID");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("category", selectedVideo.video_category);
        if (error) throw error;
        console.log("Mga tanong na nakuha:", data); // Debugging
        setQuestions(data || []);
      } catch (error) {
        console.error("Error sa pagkuha ng mga tanong:", error.message);
      }
    };

    const checkQuizCompletion = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          console.error("Ang user ay hindi naka-login.");
          return;
        }

        const { data, error } = await supabase
          .from("quiz_results")
          .select("*")
          .eq("username", username)
          .eq("video_id", selectedVideo.id);

        if (error) throw error;

        if (data && data.length > 0) {
          setQuizCompleted(true); // Mark quiz as completed
        }
      } catch (error) {
        console.error("Error sa pag-check ng pagsusulit:", error.message);
      }
    };

    fetchQuestions();
    checkQuizCompletion();
  }, [selectedVideo]);

  const handleVideoEnded = () => {
    if (quizCompleted) {
      setShowCompletedModal(true); // Ipakita ang modal kapag natapos ang video
    } else {
      setShowPrompt(true); // Ipakita ang prompt kung hindi pa tapos ang pagsusulit
    }
  };

  return (
    <div className="bg-login-background bg-repeat w-screen bg-cover bg-center bg-fixed h-screen justify-items-center relative">
      <div className="w-[440px] h-[83px] md:w-full md:h-[99px] bg-[#860074] md:px- px-10">
        <MenuBar />
      </div>

      <div className="w-[385px] h-[223px] md:w-[905px] md:h-[514.98px] mt-5 bg-[#030303]/50">
        {selectedVideo ? (
          <video
            width="100%"
            controls
            onEnded={handleVideoEnded} // Trigger modal or prompt when the video ends
            controlsList="nodownload"
          >
            <source src={selectedVideo.videoUrl} type="video/mp4" />
            Hindi sinusuportahan ng iyong browser ang video tag.
          </video>
        ) : (
          <p>Walang napiling video</p>
        )}
      </div>

      <div className="w-[385px] h-auto md:w-[905px] bg-gradient-to-b from-[#bd0c8b] to-[#90066a] p-2 flex flex-col">
        <p className="text-white text-xl font-bold">
          {selectedVideo ? selectedVideo.title : "Pamagat"}
        </p>
        <p className="text-white text-sm">
          {selectedVideo ? selectedVideo.description : "Deskripsyon"}
        </p>
        <p className="text-white text-sm">
          #{selectedVideo ? selectedVideo.video_category : "Kategorya"}
        </p>
      </div>

      <Modal isOpen={showPrompt} onClose={() => setShowPrompt(false)}>
        <Prompt onResponse={(response) => setShowQuiz(response)} />
      </Modal>

      <Modal isOpen={showQuiz} onClose={() => setShowQuiz(false)}>
        <PopUpQuiz
          questions={questions}
          videoId={selectedVideo.id}
          onQuizComplete={onQuizComplete} // Pass the callback
        />
      </Modal>

      <Modal
        isOpen={showCompletedModal}
        onClose={() => setShowCompletedModal(false)}
      >
        <div className="min-w-[300px] max-w-[320px] sm:min-w-[50%] sm:max-w-[930px] flex flex-col items-center min-h-auto bg-gradient-to-b from-[#ff8978] via-[#fc4d9f] to-[#b834c4] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8 m-8 sm:p-5">
          <p className="text-white text-lg sm:text-2xl font-semibold text-center">
            Natapos na ang pagsusulit!
          </p>
          <p className="text-white text-sm mt-3 text-center">
            Salamat sa iyong pagsagot. Maaari ka nang magpatuloy sa susunod na
            aralin.
          </p>
          <button
            onClick={() => {
              setShowCompletedModal(false);
              navigate("/dashboard"); // Redirect to the dashboard
            }}
            className="w-[250px] p-3 rounded-full text-white font-semibold mt-5 bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475]"
          >
            Magpatuloy
          </button>
        </div>
      </Modal>
    </div>
  );
};

const Prompt = ({ onResponse }) => (
  <div className="bg-gradient-to-b from-[#ff8978] via-[#fc4d9f] to-[#b834c4] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5">
    <p className="text-white text-lg">Handa ka na ba sa pagsusulit?</p>
    <div className="flex justify-around mt-4">
      <button
        onClick={() => onResponse(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Oo
      </button>
      <button
        onClick={() => onResponse(false)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Hindi
      </button>
    </div>
  </div>
);

export default VideoPage;
