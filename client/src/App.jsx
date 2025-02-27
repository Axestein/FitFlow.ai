import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import DietPlan from "./pages/DietPlan";
import Exercise from "./pages/Exercise";
import Leaderboard from "./pages/Leaderboard";
import KanbanFlow from "./pages/KanbanFlow";
import { useState } from "react";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar"; // Import Navbar
import PersonalizedExercise from "./pages/PersonalizedExercise";
import Event from "./pages/Event";
import Community from "./pages/Community";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {/* Check if user is logged in */}
      {user ? (
        // If logged in, show the Navbar and main content area
        <>
          <Route
            path="*"
            element={
              <div>
                {/* Navbar Component */}
                <Navbar />

                {/* Main Content Area */}
                <div className="bg-gray-50 mt-16">
                  {/* Wrapping Routes for each page */}
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
              </div>
            }
          />
        </>
      ) : (
        // If not logged in, redirect to login page
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
