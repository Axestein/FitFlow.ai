import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col w-64 fixed left-0 top-0 bottom-0">
      {/* Navbar and Sidebar combined */}
      <div className="bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-white">FitFlow</h1>
      </div>

      {/* Sidebar links */}
      <div className="flex-grow mt-8">
        <ul>
          <li>
            <Link to="/dashboard" className="block px-4 py-2 text-lg hover:bg-gray-700">Dashboard</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="block px-4 py-2 text-lg hover:bg-gray-700">Leaderboard</Link>
          </li>
          <li>
            <Link to="/kanbanflow" className="block px-4 py-2 text-lg hover:bg-gray-700">PlanYourDay</Link>
          </li>
          <li>
            <Link to="/dietplan" className="block px-4 py-2 text-lg hover:bg-gray-700">DietPlan</Link>
          </li>
          <li>
            <Link to="/excercise" className="block px-4 py-2 text-lg hover:bg-gray-700">Excercise</Link>
          </li>
          <li>
            <Link to="/personalized-excercise" className="block px-4 py-2 text-lg hover:bg-gray-700">Personalzied Excercise</Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 text-lg hover:bg-gray-700">Profile</Link>
          </li>
          <li>
            <Link to="/community" className="block px-4 py-2 text-lg hover:bg-gray-700">Community</Link>
          </li>
        </ul>

        <button
          className="bg-white text-gray-800 py-2 px-8 rounded-xl mt-80 hover:bg-gray-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
