// Language: jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase.js";

const LoginForm = ({ setIsLoading, setLoadingMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const login = async () => {
      setIsLoading(true);
      setLoadingMessage("Logging in...");

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !data) {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      console.log("User logged in:", data);
      localStorage.setItem("username", username);

      // Conditional navigation depending on "approved" and "haspet"
      if (data.approved) {
        if (data.haspet) {
          navigate("/dashboard");
        } else {
          navigate("/choosepet");
        }
      } else {
        navigate("/verify");
      }
      setIsLoading(false);
    };

    login();
  };

  const registerClick = () => {
    setIsLoading(true);
    setLoadingMessage("Redirecting to Register...");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/register");
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col items-center w-[287.30px] h-[263px] bg-gradient-to-b from-[#ff8978] via-[#f3328d] to-[#ec3893] rounded-[10px] md:w-[402px] md:h-[368px]">
        <p className="font-extrabold text-white p-5 md:p-10 md:text-xl">
          Mag Log in
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="flex flex-col justify-center items-center space-y-3">
              <input
                type="text"
                required
                placeholder="Username"
                className="text-xs font-normal md:text-[15px] p-3 pl-3 w-[239.95px] h-[24.76px] bg-white rounded-[5px] md:w-[335.74px] md:h-[34.65px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="text-xs font-normal md:text-[15px] p-3 pl-3 w-[239.95px] h-[24.76px] bg-white rounded-[5px] md:w-[335.74px] md:h-[34.65px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-[30px] text-white flex flex-col justify-center items-center space-y-2">
              <button
                type="submit"
                className="text-xs font-normal md:text-[15px] w-[239.95px] h-[27.12px] bg-gradient-to-r from-[#e48335] via-[#f97a53] to-[#ff6475] rounded-[15px] md:w-[335.74px] md:h-[34.65px]"
              >
                Mag Log in
              </button>

              <button
                type="button"
                onClick={registerClick}
                className="text-xs font-normal md:text-[15px] w-[239.95px] h-[27.12px] bg-gradient-to-r from-[#fe5f98] to-[#fe9299] rounded-[15px] md:w-[335.74px] md:h-[34.65px]"
              >
                Mag Rehistro ng Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
