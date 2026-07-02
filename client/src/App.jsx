import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; 
import Navbar1 from "../src/lp/components/Navbar1.jsx";
import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/lp/components/Home.jsx";
import Features from "../src/lp/components/Features.jsx";
import Usp from "../src/lp/components/Usp.jsx";
import Aboutus from "../src/lp/components/Aboutus.jsx";
import Footer from "../src/lp/components/Footer.jsx";
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
      {/* Landing page - always accessible without auth */}
      <Route path="/" element={<LandingPage navigate={navigate} />} />
      
      {/* Auth routes - always accessible */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes - only with token */}
      {user ? (
        <>
          <Route path="/dashboard" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Dashboard />
              </div>
            </>
          } />
          
          <Route path="/leaderboard" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Leaderboard />
              </div>
            </>
          } />
          
          <Route path="/dietplan" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <DietPlan />
              </div>
            </>
          } />
          
          <Route path="/excercise" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Exercise />
              </div>
            </>
          } />
          
          <Route path="/kanbanflow" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <KanbanFlow />
              </div>
            </>
          } />
          
          <Route path="/profile" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Profile />
              </div>
            </>
          } />
          
          <Route path="/personalized-exercise" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <PersonalizedExercise />
              </div>
            </>
          } />
          
          <Route path="/event" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Event />
              </div>
            </>
          } />
          
          <Route path="/community" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Community />
              </div>
            </>
          } />
          
          <Route path="/bicepcurl" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <BicepCurl />
              </div>
            </>
          } />
          
          <Route path="/frontraises" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Frontraises />
              </div>
            </>
          } />
          
          <Route path="/highknees" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <HighKnees />
              </div>
            </>
          } />
          
          <Route path="/lunges" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Lunges />
              </div>
            </>
          } />
          
          <Route path="/pullup" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <PullUp />
              </div>
            </>
          } />
          
          <Route path="/pushup" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Pushup />
              </div>
            </>
          } />
          
          <Route path="/shoulderpress" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Shoulderpress />
              </div>
            </>
          } />
          
          <Route path="/morning" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Morning />
              </div>
            </>
          } />
          
          <Route path="/squat" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Squats />
              </div>
            </>
          } />
          
          <Route path="/deskcurls" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Deskcurls />
              </div>
            </>
          } />
          
          <Route path="/hand" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Hand />
              </div>
            </>
          } />
          
          <Route path="/kneeraises" element={
            <>
              <Navbar />
              <div className="bg-gray-50 mt-16">
                <Kneeraises />
              </div>
            </>
          } />
        </>
      ) : (
        // Redirect to login if trying to access protected routes without token
        <Route path="*" element={<Navigate replace to="/login" />} />
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
        <Home />
        <Features />
        <Aboutus />
        <Footer />
      </div>
    </>
  );
};

export default App;