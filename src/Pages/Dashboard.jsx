import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import VideoHolder from "../Components/VideoHolder";
import supabase from "../../supabase";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const username = localStorage.getItem("username"); // Retrieve the current username
        if (!username) {
          console.error("User is not logged in.");
          return;
        }

        // Fetch videos
        const { data: videosData, error: videosError } = await supabase
          .from("videos")
          .select("*")
          .order("sequence", { ascending: true }); // Sort by the `sequence` column
        if (videosError) throw videosError;

        setVideos(videosData || []);
        setVideoCount(videosData.length || 0);

        // Fetch quiz results for the current user
        const { data: resultsData, error: resultsError } = await supabase
          .from("quiz_results")
          .select("video_id, category, username")
          .eq("username", username); // Filter by the current username
        if (resultsError) throw resultsError;

        // Map quiz results to determine completion status
        const resultsMap = {};
        resultsData.forEach((result) => {
          resultsMap[result.video_id] = true; // Mark as completed if the video_id exists for the user
        });
        setQuizResults(resultsMap);
      } catch (error) {
        console.error("Error fetching videos or quiz results:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleQuizComplete = (videoId) => {
    setQuizResults((prevResults) => ({
      ...prevResults,
      [videoId]: true, // Mark the video as completed
    }));
    // Optionally, you can also save this result to the database
    const username = localStorage.getItem("username");
    if (username) {
      supabase
        .from("quiz_results")
        .insert([{ username, video_id: videoId }])
        .then(({ error }) => {
          if (error) {
            console.error("Error saving quiz result:", error.message);
          } else {
            console.log("Quiz result saved successfully.");
          }
        });
    } else {
      console.error("User is not logged in. Cannot save quiz result.");
    }
  };

  const completedCount = Object.values(quizResults).filter(
    (status) => status
  ).length;
  const progress = videoCount > 0 ? (completedCount / videoCount) * 100 : 0;

  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-screen justify-items-center">
        <div className="w-screen h-[190px] bg-[#860074] md:px-20 px-10">
          <MenuBar />
          <div className="text-white text-center py-5">
            <p className="text-[15px] font-extrabold">Aking Progreso</p>
            <p className="text-xs">
              Aralin {completedCount}/{videoCount}
            </p>
          </div>

          <progress
            className="w-full h-[12.38px] md:h-[19px] appearance-none [&::-webkit-progress-bar]:bg-[#ffffff] [&::-webkit-progress-value]:bg-[#ff0004] [&::-moz-progress-bar]:bg-[#ff6200] rounded-full"
            value={progress}
            max="100"
          ></progress>
        </div>

        {loading ? (
          <p className="text-center text-white mt-10">
            Naglo-load ng mga video...
          </p>
        ) : videos.length === 0 ? (
          <p className="text-center text-white mt-10">
            Walang mga video na magagamit.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-x-8 pt-5">
            {videos.map((video, index) => {
              const isUnlocked =
                index === 0 || quizResults[videos[index - 1]?.id]; // Unlock the first video and subsequent videos based on completion

              return isUnlocked ? (
                <Link
                  to="/video"
                  state={{
                    selectedVideo: {
                      ...video,
                      videoUrl: video.video_url, // Add this line to ensure videoUrl is present
                      title: video.video_name, // Add this line to ensure title is present
                      description: video.video_description, // Add this line for description
                    },
                    id: video.id,
                  }}
                  key={video.id}
                >
                  <VideoHolder
                    id={video.id}
                    title={video.video_name}
                    thumbnail={
                      video.video_thumbnail || "https://via.placeholder.com/240"
                    }
                    videoUrl={video.video_url}
                    description={video.video_description}
                    category={video.video_category}
                    index={index}
                    completed={quizResults[video.id] || false}
                  />
                </Link>
              ) : (
                <div
                  key={video.id}
                  className="opacity-50 cursor-not-allowed"
                  title="Ang video na ito ay naka-lock."
                >
                  <VideoHolder
                    id={video.id}
                    title={video.video_name}
                    thumbnail={
                      video.video_thumbnail || "https://via.placeholder.com/240"
                    }
                    videoUrl={video.video_url}
                    description={video.video_description}
                    category={video.video_category}
                    index={index}
                    completed={quizResults[video.id] || false}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
