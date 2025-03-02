import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; 
import Navbar1 from "../src/lp/components/Navbar1.jsx";
import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/lp/components//Home.jsx";
import Features from "../src/lp/components//Features.jsx";
import Usp from "../src/lp/components//Usp.jsx";
import Aboutus from "../src/lp/components//Aboutus.jsx";
import Footer from "../src/lp/components//Footer.jsx";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import DietPlan from "./pages/DietPlan";
import Exercise from "./pages/Exercise";
import Leaderboard from "./pages/Leaderboard";
import KanbanFlow from "./pages/KanbanFlow";
import { useState } from "react";
import Profile from "./pages/Profile";
import PersonalizedExercise from "./pages/PersonalizedExercise";
import Event from "./pages/Event";
import Community from "./pages/Community";
import BicepCurl from "./pages/Excercise/Bicepcurl.jsx";
import Frontraises from "./pages/Excercise/Frontraises.jsx";
import HighKnees from "./pages/Excercise/Highknees.jsx";
import Lunges from "./pages/Excercise/Lunges.jsx";
import Morning from "./pages/Excercise/Morning.jsx";
import PullUp from "./pages/Excercise/Pullup.jsx";
import Pushup from "./pages/Excercise/Pushup.jsx";
import Shoulderpress from "./pages/Excercise/Shoulderpress.jsx";
import Squats from "./pages/Excercise/Sqaut.jsx";
import Deskcurls from "./pages/Excercise/DeskExcercise/Deskcurls.jsx";
import Kneeraises from "./pages/Excercise/DeskExcercise/Kneeraises.jsx";
import Hand from "./pages/Excercise/DeskExcercise/Hand.jsx";

function App() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();  

  return (
    <Routes>
      <Route path="/" element={<LandingPage navigate={navigate} />} />
      
      {!user ? (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </>
      ) : (
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/dietplan" element={<DietPlan />} />
                  <Route path="/excercise" element={<Exercise />} />
                  <Route path="/kanbanflow" element={<KanbanFlow />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/personalized-exercise" element={<PersonalizedExercise />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/community" element={<Community />} />
                  
                  <Route path="/bicepcurl" element={<BicepCurl />} />
                  <Route path="/frontraises" element={<Frontraises />} />
                  <Route path="/highknees" element={<HighKnees />} />
                  <Route path="/lunges" element={<Lunges />} />
                  <Route path="/pullup" element={<PullUp />} />
                  <Route path="/pushup" element={<Pushup />} />
                  <Route path="/shoulderpress" element={<Shoulderpress />} />
                  <Route path="/morning" element={<Morning />} />
                  <Route path="/squat" element={<Squats />} />
                  <Route path="/deskcurls" element={<Deskcurls />} />
                  <Route path="/hand" element={<Hand />} />
                  <Route path="/kneeraises" element={<Kneeraises />} />
                </Routes>
              </div>
            </>
          }
        />
      )}
    </Routes>
  );
}

const LandingPage = ({ navigate }) => {
  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <Navbar1 />
      <div className="bg-gray-50 mt-16">
        <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
              <Aboutus />
              <Footer />
            </>
          }
        />
        </Routes>
      </div>
    </>
  );
};

export default App;
