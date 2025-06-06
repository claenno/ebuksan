import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]); // State to hold the list of schools
  const [school, setSchool] = useState(""); // Selected school

  const navigate = useNavigate();

  const registerClick = () => {
    navigate("/verify");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    // No need to fetch or set id!
    const { data, error } = await supabase.from("users").insert([
      {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        school: school,
      },
    ]);

    if (error) {
      if (
        error.code === "23505" &&
        error.message.includes("users_username_key")
      ) {
        alert("Username na ito ay ginagamit na. Pakisubukan ang iba.");
      } else {
        alert("Registration failed. Please check your credentials.");
      }
      console.error("Registration error:", error);
      setLoading(false);
      return;
    }
    console.log("User registered:", data);
    setLoading(false);
    registerClick();
  };

  useEffect(() => {
    const fetchSchools = async () => {
      const { data, error } = await supabase.from("schools").select("*");
      if (error) {
        console.error("Error fetching schools:", error);
        setSchools([]);
      } else {
        setSchools(data);
      }
    };
    fetchSchools();
  }, []);

  return (
    <>
      <div className="mt-[40px] w-[299.39px] h-auto md:w-[402px] md:h-auto pb-5 bg-gradient-to-b from-[#ff8978] via-[#f3328d] to-[#ec3893] rounded-[10px] flex flex-col items-center">
        <p className="font-extrabold text-white p-5 md:p-10">Rehistro</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-4"
        >
          <div className="flex justify-center items-center text-sm md:text-[15px] space-x-2.5">
            <input
              type="text"
              placeholder="Unang Pangalan"
              required
              className=" pl-3 w-[121.23px] h-[28px] md:w-[163px] md:h-[34.65px] bg-white rounded-[5px]"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apilyedo"
              required
              className=" pl-3 w-[121.23px] h-[28px] md:w-[163px] md:h-[34.65px]  bg-white rounded-[5px]"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <select
              value={school}
              required
              className="px-3 w-[249.71px] h-[28px] md:w-[335.74px] md:h-[34.65px] bg-white rounded-[5px] text-black"
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value="" disabled>
                Anong Paaralan
              </option>
              {schools.map((schoolObj) => (
                <option key={schoolObj.id} value={schoolObj.school_value}>
                  {schoolObj.school_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center text-sm md:text-[15px] items-center space-y-3">
            <input
              type="text"
              required
              placeholder="Username"
              className="p-2 pl-3 w-[249.71px] h-[28px] md:w-[335.74px] md:h-[34.65px] bg-white rounded-[5px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className=" pl-3 w-[249.71px] h-[28px] md:w-[335.74px] md:h-[34.65px]  bg-white rounded-[5px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Siguraduhin ang Password"
              className=" pl-3 w-[249.71px] h-[28px] md:w-[335.74px] md:h-[34.65px] bg-white rounded-[5px]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mt-[20px] md:mt-[40px] flex flex-col justify-center items-center ">
            <button
              type="submit"
              disabled={loading}
              className="w-[249.71px] h-[28.22px] md:w-[335px] md:h-[34.65px] bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475] rounded-[15px] text-white"
            >
              {loading ? "Inaayos" : "Magrehistro na"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
