import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "../Components/LoadingScreen";
import supabase from "../../supabase";

const PetPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showEvolveModal, setShowEvolveModal] = useState(false);

  // Add state for pet data
  const [petData, setPetData] = useState(null);
  const [levelExp, setLevelExp] = useState(null); // State for XP required for the next level

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data, waiting for assets)
    const timer = setTimeout(() => {
      setIsLoading(false); // After 2 seconds, hide the loading screen
    }, 2000);

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  // Getting the data from the database
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("username", localStorage.getItem("username"))
          .maybeSingle();

        if (error) throw error;

        // Store the pet data in state
        setPetData(data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, []);

  // Fetch XP required for the next level
  useEffect(() => {
    const fetchLevelExp = async () => {
      if (!petData?.petlevel) return;
      const { data, error } = await supabase
        .from("levelexprequired")
        .select("exp_need")
        .eq("level", petData.petlevel)
        .single();
      if (!error && data) setLevelExp(data.exp_need);
    };
    fetchLevelExp();
  }, [petData?.petlevel]);

  // Automatically trigger evolution when experience reaches the required level
  useEffect(() => {
    const handleEvolution = async () => {
      if (!petData || !levelExp || petData.experience < levelExp) return;

      const newLevel = petData.petlevel + 1; // Increment the level
      const remainingExperience = petData.experience - levelExp; // Calculate remaining XP

      try {
        // Update the pet's level and experience in the database
        const { error } = await supabase
          .from("users")
          .update({
            petlevel: newLevel,
            experience: remainingExperience,
          })
          .eq("username", localStorage.getItem("username"));

        if (error) throw error;

        // Update the pet data in the state
        setPetData((prevData) => ({
          ...prevData,
          petlevel: newLevel,
          experience: remainingExperience,
        }));

        // Fetch the new level's required experience
        const { data: levelData, error: levelError } = await supabase
          .from("levelexprequired")
          .select("exp_need")
          .eq("level", newLevel)
          .single();

        if (levelError) throw levelError;

        setLevelExp(levelData.exp_need);

        // Show evolution modal
        setShowEvolveModal(true);
      } catch (error) {
        console.error("Error evolving pet:", error.message);
      }
    };

    handleEvolution();
  }, [petData?.experience, levelExp]);

  const getPetImage = (petid, level) => {
    if (!petid || !level) return "./images/pet1.png"; // fallback

    if (level === 1) return `./images/pet${petid}.png`;
    if (level === 2) return `./images/pet${petid}Evo2.png`;
    if (level >= 3) return `./images/pet${petid}Evo3.png`;

    return "./images/pet1.png";
  };

  // Helper function for evolution modal (fromLevel to toLevel)
  const getPetEvolutionImages = (petid, fromLevel, toLevel) => {
    const fromImg =
      fromLevel === 1
        ? `./images/pet${petid}.png`
        : fromLevel === 2
        ? `./images/pet${petid}Evo2.png`
        : `./images/pet${petid}Evo3.png`;
    const toImg =
      toLevel === 2
        ? `./images/pet${petid}Evo2.png`
        : `./images/pet${petid}Evo3.png`;
    return { fromImg, toImg };
  };

  return (
    <>
      {/* Show the Loading Screen while loading */}
      {isLoading && <LoadingScreen />}

      {/* Render the rest of the content when not loading */}
      {!isLoading && (
        <div className="w-full min-h-screen bg-[url('/images/petBackground.png')] bg-cover bg-center bg-no-repeat">
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-5 right-5 bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            Level Up
          </button>
          <div>
            <div className="pl-10 pt-9">
              {/* Rectangle */}
              <div className="relative md:w-[150px] md:h-11 md:left-[45px] w-[109px] h-[32px] text-right pr-5 md:pr-8 border-[#c600c3] border-[5px] bg-[#80007e]">
                <p className="text-white md:text-2xl text-lg font-extrabold font-['Inter']">
                  PET
                </p>

                {/* Circle Positioned on the Left */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] w-[51px] h-[51px] bg-[#fcce0d] rounded-full border-4 border-[#b68625] flex justify-center items-center">
                  <div className="w-[33px] h-[27px]">
                    <img
                      className="absolute top-[-50px] md:top-[-70px] left-1/2 -translate-x-1/2 md:w-[180px] w-[120px] z-10"
                      src={getPetImage(petData?.petid, petData?.petlevel)}
                      alt="Pet"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:px-[200px] gap-y-5 justify-center items-center">
              {/* Outer Flex Container */}
              <div className="flex items-center flex-wrap mt-11 md:mt-20">
                {/* Level Display */}
                <div className="w-[70px] h-12 bg-[#80007e] border-4 border-[#c600c3] flex justify-center items-center">
                  <p className="text-white md:text-2xl text-[19px] font-semibold">
                    Lvl. {petData?.petlevel ?? "--"}
                  </p>
                </div>

                {/* Dynamic Name Display */}
                <div className=" min-w-[140px] md:min-w-[178px] h-10 md:h-[42px] border-[#F9CB0B] border-4 bg-custom-gradient px-4 flex items-center">
                  <p className="text-white text-lg md:text-2xl font-extrabold font-['Inter'] overflow-hidden whitespace-nowrap">
                    {petData?.petname ?? "Pet Name"}
                  </p>
                </div>
              </div>

              {/* Pet State */}
              <div className="w-[274px] h-[110px] p-2 border-4 border-[#c600c3] bg-[#80007e]">
                <div className="flex items-center">
                  <p className="text-white text-lg md:text-2xl font-extrabold font-['Inter'] overflow-hidden whitespace-nowrap inline-flex">
                    Kalagayan:
                  </p>
                  <p className="text-white text-lg md:text-2xl font-extrabold font-['Inter'] overflow-hidden whitespace-nowrap ml-2">
                    {petData?.pet_state ?? "Malusog"}
                  </p>
                </div>
                <p className="text-white text-sm mt-2">
                  Ipagpatuloy ang mahusay na pagsagot sa pagsusulit.
                </p>
              </div>
            </div>

            {/* Wrapper for Tree Trunk and Progress Bar */}
            <div className="flex flex-col justify-center items-center mt-[225px] md:mt-[226px]">
              {/* Tree Trunk (Parent Container) */}
              <div className="relative">
                {/* Pet Image Over the Tree Trunk */}
                <img
                  className="absolute top-[-50px] md:top-[-70px] left-1/2 -translate-x-1/2 md:w-[180px] w-[120px] z-10"
                  src={getPetImage(petData?.petid, petData?.petlevel)}
                  alt="Pet"
                />

                {/* Tree Trunk */}
                <img
                  className="md:w-[286.18px] md:h-[258.80px] w-[200px]"
                  src="./images/treeTrunk.png"
                />
              </div>

              {/* Experience Bar Below the Tree Trunk */}
              <div className="w-[315px] h-14 md:w-[479px] md:h-[72px] bg-[#80007e] border-[#c600c3] border-4 p-2 mt-5 md:mt-0 flex flex-col justify-center items-center">
                <p className="text-white font-bold">Experience:</p>

                {/* Progress Bar (Tailwind Utility) */}
                <div className="relative w-full md:mt-2">
                  <progress
                    className="w-full h-[12.38px] md:h-[19px] appearance-none [&::-webkit-progress-bar]:bg-[#460266] [&::-webkit-progress-value]:bg-[#ae00ff] [&::-moz-progress-bar]:bg-[#ae00ff]"
                    value={
                      petData?.experience && levelExp
                        ? Math.min((petData.experience / levelExp) * 100, 100)
                        : 0
                    }
                    max="100"
                  ></progress>

                  {/* XP Text Centered */}
                  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs md:text-sm font-bold w-full text-center">
                    {petData?.experience && levelExp
                      ? `Current XP: ${petData.experience} / ${levelExp}`
                      : "Loading XP..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evolution Modal */}
      {showEvolveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md text-center">
            <h2 className="text-lg font-bold">Your pet has evolved!</h2>
            <img
              src={getPetImage(petData?.petid, petData?.petlevel)}
              alt="Evolved Pet"
              className="w-40 h-40 mx-auto"
            />
            <button
              onClick={() => setShowEvolveModal(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetPage;
