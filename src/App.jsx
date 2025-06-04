import React, { useState } from "react";
import Header from "./Components/Header";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import VerifiedNotification from "./Pages/VerifiedNotification";
import ChoosePet from "./Pages/ChoosePet";
import Dashboard from "./Pages/Dashboard";
import PetNamePage from "./Pages/PetNamePage";
import VideoPage from "./Pages/VideoPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PowerPoint from "./Pages/PowerPoint";
import WordPage from "./Pages/WordPage";
import PetPage from "./Pages/PetPage";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import LoadingScreen from "./Components/LoadingScreen"; // Import the LoadingScreen component
import AdminPowerPoint from "./Pages/admin/AdminPowerPoint";
import AdminDocument from "./Pages/admin/AdminDocument";
import QuizPage from "./Pages/QuizPage";
import AdminUsers from "./Pages/admin/AdminUsers.jsx";
import About from "./Pages/About.jsx";
import Intro from "./Pages/Intro.jsx";
import StudentVideos from "./Pages/StudentVideos.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [loadingMessage, setLoadingMessage] = useState("Loading..."); // State for loading message

  return (
    <>
      <div className="">
        <Router>
          {/* Show LoadingScreen when isLoading is true */}
          {isLoading && <LoadingScreen message={loadingMessage} />}

          <Header
            setIsLoading={setIsLoading}
            setLoadingMessage={setLoadingMessage}
          />

          <Routes>
            {/* Pass setIsLoading and setLoadingMessage as props to components */}
            <Route
              path="/register"
              element={
                <RegisterPage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/"
              element={
                <LoginPage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/verify"
              element={
                <VerifiedNotification
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/choosePet"
              element={
                <ChoosePet
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/petName"
              element={
                <PetNamePage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/powerPoint"
              element={
                <PowerPoint
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/word"
              element={
                <WordPage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/video"
              element={
                <VideoPage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/pet"
              element={
                <PetPage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />

            <Route
              path="/quiz"
              element={
                <QuizPage
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/about"
              element={
                <About
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />
            <Route
              path="/intro"
              element={
                <Intro
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                />
              }
            />

            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/studentVideos" element={<StudentVideos />} />
            <Route path="/adminPowerPoint" element={<AdminPowerPoint />} />
            <Route path="/adminDocument" element={<AdminDocument />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
