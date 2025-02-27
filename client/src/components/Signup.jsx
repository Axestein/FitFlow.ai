import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      
      // Show success toast
      setShowToast(true);
      
      // Redirect after showing toast
      setTimeout(() => {
        navigate("/login");
        console.log(res.message);
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
          <span>Account created successfully! Redirecting...</span>
        </div>
      )}

      <div className="w-full max-w-4xl mx-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Left side - Brand/Image */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white md:w-1/2 flex flex-col justify-between order-2 md:order-1">
            <div>
              <h1 className="text-3xl font-bold mb-2">FitFlow</h1>
              <p className="text-purple-200 mb-8">Join our fitness community today</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Free 7-day premium trial</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Customized workout plans</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Nutrition tracking & advice</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>Progress analytics dashboard</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-purple-200">© 2025 FitFlow. All rights reserved.</p>
            </div>
          </div>
          
          {/* Right side - Signup Form */}
          <div className="p-10 md:w-1/2 order-1 md:order-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-500 mt-2">Join FitFlow to start your fitness journey</p>
            </div>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    name="firstName"
                    onChange={handleChange}
                    value={data.firstName}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    onChange={handleChange}
                    value={data.lastName}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700 transition-all"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
            
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
