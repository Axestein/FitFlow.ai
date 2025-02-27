import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "http://localhost:5000/api/auth"; // replace with your backend API endpoint
      const { data: res } = await axios.post(url, data);

      // Show success toast
      setShowToast(true);
      
      // Store token and username in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
      
      // Redirect to Dashboard after showing toast
      setTimeout(() => {
        window.location = "/dashboard"; // Change to your dashboard route
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Hide toast after 2 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Login successful! Redirecting...</span>
        </div>
      )}

      <div className="w-full max-w-4xl mx-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Left side - Brand/Image */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">FitFlow</h1>
              <p className="text-purple-200 mb-8">Transform your fitness journey</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Personalized fitness plans</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Track your progress</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Connect with community</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-purple-200">© 2025 FitFlow. All rights reserved.</p>
            </div>
          </div>
          
          {/* Right side - Login Form */}
          <div className="p-10 md:w-1/2">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Please sign in to your account</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Forgot password?</a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;