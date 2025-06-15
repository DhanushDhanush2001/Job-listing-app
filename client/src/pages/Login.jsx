import React, { useState,useContext} from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from "react-icons/ri";
import { Link,Navigate } from "react-router-dom";
import { FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    const handleLogin = async(e) => {
        e.preventDefault();
        if (!email || !password || !role) {
            toast.error("Please fill in all fields");
            return;
        }
        
        setIsLoading(true);
        try {
            const {data} = await axios.post(
              "http://localhost:8000/api/v1/user/login",
              {email, password, role},
              {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            toast.success(data.message);
            setUser(data.user);
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);
        } catch(error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };
    if(isAuthorized){
    return <Navigate to={'/home'}/>
  }

    return (
        <div className="auth-container">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Form */}
                <div className="auth-card max-w-md mx-auto w-full animate-fade-in">
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                                <FaRegUser className="text-white text-2xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to your CareerConnect account</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold  text-gray-700 dark:text-gray">
                                    Login As
                                </label>
                                <div className="input-group">
                                    <select 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className="select-field text-gray-700"
                                        required
                                    >
                                        <option value="">Select your role</option>
                                        <option value="jobseeker">jobseeker</option>
                                        <option value="employer">employer</option>
                                    </select>
                                    <FaRegUser className="input-icon" />
                                    <HiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                        required
                                    />
                                    <MdOutlineMailOutline className="input-icon" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field pr-12"
                                        required
                                    />
                                    <RiLock2Fill className="input-icon" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            {/* Register Link */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link 
                                        to="/register" 
                                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side - Illustration */}
                <div className="hidden lg:block">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-700/20 rounded-3xl transform rotate-3"></div>
                        <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                            <img 
                                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Professional workspace" 
                                className="w-full h-96 object-cover rounded-2xl"
                            />
                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Find Your Dream Job
                                </h3>
                                <p className="text-gray-600">
                                    Connect with top employers and discover opportunities that match your skills and aspirations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;