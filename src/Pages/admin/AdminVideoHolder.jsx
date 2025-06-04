import React, { useEffect, useState } from "react";
import AdminQuestions from "./AdminQuestions";
import AdminEditVideo from "./AdminEditVideo";
import supabase from "../../../supabase";

const AdminVideoHolder = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showQuizOption, setShowQuizOption] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [videoToEdit, setVideoToEdit] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.from("videos").select("*");
        if (error) throw error;
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const deleteVideo = async (videoId) => {
    try {
      const { error } = await supabase
        .from("videos")
        .delete()
        .eq("id", videoId);
      if (error) throw error;
      setVideos(videos.filter((video) => video.id !== videoId));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting video:", error.message);
    }
  };

  const handleAddQuiz = () => {
    setShowQuizModal(true);
  };

  const handleEditButton = (video) => {
    setVideoToEdit(video);
    setShowEditModal(true);
  };

  const handleQuizClick = () => {
    setShowQuizOption(true);
  };

  const handleCloseClick = () => {
    setShowQuizOption(false);
  };

  const handleDeleteClick = (videoId) => {
    setVideoToDelete(videoId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (videoToDelete) {
      deleteVideo(videoToDelete);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setVideoToDelete(null);
  };

  return (
    <>
      <div className="pt-5 flex flex-col justify-center items-center gap-5">
        {videos.map((video, index) => (
          <div
            key={index}
            className="md:w-[617px] w-[80%] h-[118px] bg-[#90066a] rounded-[5px] flex"
          >
            <div className="w-[80%] h-auto flex  items-center pl-3">
              <div className="flex w-[80%] items-center gap-3 ">
                <div className="w-[153px] h-[87.06px] bg-[#030303]/50 flex justify-center items-center">
                  <img
                    className="h-[100%] w-[100%]"
                    src={video.video_thumbnail}
                    alt="video"
                  />
                </div>
                <div className="flex flex-col gap-3 justify-start text-white">
                  <p>{video.video_name}</p>
                  <p>{video.video_description}</p>
                </div>
              </div>
            </div>
            <div className="w-[20%] h-auto flex flex-col justify-between p-2 gap-2 text-white">
              <button
                onClick={handleQuizClick}
                className="w-auto h-[30px] bg-[#00ffc8] rounded-[5px] p-1"
              >
                Quiz
              </button>
              <button
                onClick={() => handleEditButton(video)}
                className="w-auto h-[30px] bg-[#ffcc00] rounded-[5px] p-1"
              >
                Edit
              </button>
              <button
                className="w-auto h-[30px] bg-[#e63363] rounded-[5px] px-1"
                onClick={() => handleDeleteClick(video.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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

      {showQuizOption && (
        <div className="w-100% flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
          <div className="w-[461px] h-auto bg-[#fe6462] p-3 rounded-[5px] gap-3 flex flex-col items-center justify-center">
            <AdminQuestions />
            <button
              className="bg-green-400 text-white rounded-[5px] px-3"
              onClick={handleCloseClick}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" rounded-lg p-6 w-[700px] max-h-[90vh] ">
            <AdminEditVideo
              video={videoToEdit}
              onClose={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVideoHolder;
