import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; // Import necessary hooks and components
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

function App() {
  const user = localStorage.getItem("token");  // Check if the user is logged in
  const navigate = useNavigate();  // Initialize the navigate hook

  return (
    <Routes>
      {/* Landing Page Routes */}
      <Route path="/" element={<LandingPage navigate={navigate} />} />
      
      {/* Authentication Routes (If user is not logged in) */}
      {!user ? (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </>
      ) : (
        // If user is logged in, show the main app routes
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
                </Routes>
              </div>
            </>
          }
        />
      )}
    </Routes>
  );
}

// Landing Page Component (with the Get Started button that navigates to signup)
const LandingPage = ({ navigate }) => {
  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <>
      {/* Navbar Component */}
      <Navbar1 />
      {/* Main Content Area */}
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
