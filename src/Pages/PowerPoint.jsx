import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import PowerPointHolder from "../Components/PowerPointHolder";
import supabase from "../../supabase";

const PowerPoint = () => {
  const [powerPoints, setPowerPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPowerPoints = async () => {
      try {
        const { data, error } = await supabase.from("powerpoints").select("*");
        if (error) throw error;
        setPowerPoints(data);
      } catch (error) {
        console.error("Error fetching PowerPoints:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPowerPoints();
  }, []);

  return (
    <>
      <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-screen justify-items-center">
        <div className="w-screen h-[100px] bg-[#860074] md:px-20 px-10 flex items-center">
          <MenuBar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 pt-5">
          {loading ? (
            <p className="text-center text-white">
              Naglo-load ng mga PowerPoint...
            </p>
          ) : (
            powerPoints.map((ppt) => (
              <PowerPointHolder
                key={ppt.id}
                title={ppt.ppt_title}
                description={ppt.ppt_description}
                type={ppt.ppt_type}
                url={ppt.ppt_url}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PowerPoint;
