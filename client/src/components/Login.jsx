import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Frontend-only validation
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Store token in localStorage (fake token)
      localStorage.setItem('token', 'fake-jwt-token-12345');
      localStorage.setItem('user', JSON.stringify({ email, name: 'Fitness Enthusiast' }));
      
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              <span className="text-white">Fit</span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Flow</span>
            </h1>
            <p className="text-gray-400 mt-2">Welcome back! Login to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 text-emerald-400 focus:ring-emerald-400" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300 transition">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                <>
                  Login <LogIn className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition">
                Sign up
                <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [data, setData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const url = "http://localhost:5000/api/auth"; // replace with your backend API endpoint
//       const { data: res } = await axios.post(url, data);

//       // Show success toast
//       setShowToast(true);
      
//       // Store token and username in localStorage
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("username", res.username);
      
//       // Redirect to Dashboard after showing toast
//       setTimeout(() => {
//         window.location = "/dashboard"; // Change to your dashboard route
//       }, 2000);
//     } catch (error) {
//       setLoading(false);
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   // Hide toast after 2 seconds
//   useEffect(() => {
//     if (showToast) {
//       const timer = setTimeout(() => {
//         setShowToast(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showToast]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
//       {/* Toast Notification */}
//       {showToast && (
//         <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//           </svg>
//           <span>Login successful! Redirecting...</span>
//         </div>
//       )}

//       <div className="w-full max-w-4xl mx-4">
//         <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
//           {/* Left side - Brand/Image */}
//           <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white md:w-1/2 flex flex-col justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">FitFlow</h1>
//               <p className="text-purple-200 mb-8">Transform your fitness journey</p>
//             </div>
            
//             <div className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white/20 p-2 rounded-full">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <p>Personalized fitness plans</p>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white/20 p-2 rounded-full">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <p>Track your progress</p>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white/20 p-2 rounded-full">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <p>Connect with community</p>
//               </div>
//             </div>
            
//             <div className="mt-8">
//               <p className="text-sm text-purple-200">© 2025 FitFlow. All rights reserved.</p>
//             </div>
//           </div>
          
//           {/* Right side - Login Form */}
//           <div className="p-10 md:w-1/2">
//             <div className="mb-10">
//               <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//               <p className="text-gray-500 mt-2">Please sign in to your account</p>
//             </div>
            
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   placeholder="yourname@example.com"
//                   name="email"
//                   onChange={handleChange}
//                   value={data.email}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 />
//               </div>
              
//               <div>
//                 <div className="flex justify-between mb-1">
//                   <label className="block text-sm font-medium text-gray-700">Password</label>
//                   <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Forgot password?</a>
//                 </div>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   name="password"
//                   onChange={handleChange}
//                   value={data.password}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 />
//               </div>
              
//               {error && (
//                 <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                   <span>{error}</span>
//                 </div>
//               )}
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md flex justify-center items-center"
//               >
//                 {loading ? (
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
              
//               <div className="mt-6 text-center">
//                 <p className="text-gray-600">
//                   Don't have an account?{" "}
//                   <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
//                     Create Account
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;