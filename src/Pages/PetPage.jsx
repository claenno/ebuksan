// ...existing imports...
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
    if (!petid || !level) return "./images/pet1.gif"; // fallback

    if (level === 1) return `./images/pet${petid}.gif`;
    if (level === 2) return `./images/pet${petid}Evo2.gif`;
    if (level >= 3) return `./images/pet${petid}Evo3.gif`;

    return "./images/pet1.gif";
  };

  // Helper function for evolution modal (fromLevel to toLevel)
  const getPetEvolutionImages = (petid, fromLevel, toLevel) => {
    const fromImg =
      fromLevel === 1
        ? `./images/pet${petid}.gif`
        : fromLevel === 2
        ? `./images/pet${petid}Evo2.gif`
        : `./images/pet${petid}Evo3.gif`;
    const toImg =
      toLevel === 2
        ? `./images/pet${petid}Evo2.gif`
        : `./images/pet${petid}Evo3.gif`;
    return { fromImg, toImg };
  };

  return (
    <>
      {/* Show the Loading Screen while loading */}
      {isLoading && <LoadingScreen />}

      {/* Render the rest of the content when not loading */}
      {!isLoading && (
        <div className="w-full min-h-screen bg-[url('/images/petBackground.png')] bg-cover bg-center bg-no-repeat">
          <div>
            <div className="pl-10 pt-9">
              {/* Rectangle */}
              <div className="relative md:w-[150px] md:h-11 md:left-[45px] w-[109px] h-[32px] text-right pr-5 md:pr-8 border-[#c600c3] border-[5px] bg-[#80007e] pl-9">
                <p className=" text-white md:text-2xl text-lg font-extrabold font-['Inter']">
                  Alaga
                </p>

                {/* Circle Positioned on the Left */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] w-[51px] h-[51px] bg-[#fcce0d] rounded-full border-4 border-[#b68625] flex justify-center items-center">
                  <div className="w-[33px] h-[27px]">
                    <img src="/images/petIcon.png" alt="Pet" />
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
                <p className="text-white font-bold">Karanasan:</p>

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
                      ? `Kasalukuyang XP: ${petData.experience} / ${levelExp}`
                      : "Loading ang XP..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evolution Modal */}
      {showEvolveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -10,
              filter: "blur(10px)",
            }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10, filter: "blur(10px)" }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 80,
            }}
            className="bg-[#c700c3] rounded-lg w-[80%] md:w-[400px] pb-5 shadow-lg text-center relative"
          >
            <div className="bg-[#8d00b1] rounded-tl-[10px] rounded-tr-[10px]">
              <h2 className="text-xl md:text-2xl font-bold text-white p-3 animate-glow">
                Binabati kita!
              </h2>
            </div>
            <p className="text-black mt-2">
              Ang iyong alaga ay tumaas ng antas!
            </p>

            {/* Pet Evolution Images with Magic Glow */}
            <div className="flex justify-center items-center gap-5 my-4">
              <motion.img
                src={getPetImage(petData?.petid, (petData?.petlevel ?? 2) - 1)}
                alt="Pet Level Before"
                className="w-20 h-20 md:w-24 md:h-24"
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <span className="text-3xl font-bold text-[#80007e] animate-spin-slow">
                →
              </span>
              <motion.img
                src={getPetImage(petData?.petid, petData?.petlevel)}
                alt="Pet Level After"
                className="w-20 h-20 md:w-24 md:h-24"
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>

            {/* Button to Close Evolution Modal */}
            <motion.button
              onClick={() => setShowEvolveModal(false)}
              className="bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475] text-white px-4 py-2 w-[70%] rounded-full shadow-md relative z-10"
            >
              OK
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default PetPage;
