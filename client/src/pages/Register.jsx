import React, { useState,useContext } from 'react';
import { FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { HiChevronDown } from 'react-icons/hi';
import { Link,Navigate} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { Context} from '../main';

const Register = () => {
    const [email, setEmail] = useState("");
    const [fullname, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthorized, setIsAuthorized} = useContext(Context);
    
    const handleRegister = async(e) => {
        e.preventDefault();
        if (!fullname || !email || !phoneNumber || !password || !role) {
            toast.error("Please fill in all fields");
            return;
        }
        
        setIsLoading(true);
        try {
            const {data} = await axios.post(
                "http://localhost:8000/api/v1/user/register",
                { fullname, phoneNumber, email, role, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setFullName("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");
            setRole("");
            setIsAuthorized(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };
    if(isAuthorized){
    return <Navigate to={'/login'}/>
  }
    
    return (
        <div className="auth-container">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Illustration */}
                <div className="hidden lg:block order-2 lg:order-1">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-l from-primary-600/20 to-primary-700/20 rounded-3xl transform -rotate-3"></div>
                        <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                            <img 
                                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Team collaboration" 
                                className="w-full h-96 object-cover rounded-2xl"
                            />
                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Join Our Community
                                </h3>
                                <p className="text-gray-600">
                                    Start your journey with thousands of professionals and companies looking for talent.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-card max-w-md mx-auto w-full animate-fade-in order-1 lg:order-2">
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                                <FaPencilAlt className="text-white text-2xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join CareerConnect today</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-6">
                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Register As
                                </label>
                                <div className="input-group">
                                    <select 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className="select-field text-gray-700"
                                        required
                                    >
                                        <option value="">Select your role</option>
                                        <option value="employer">employer</option>
                                        <option value="jobseeker">jobseeker</option>
                                    </select>
                                    <FaRegUser className="input-icon" />
                                    <HiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={fullname}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="input-field"
                                        required
                                    />
                                    <FaPencilAlt className="input-icon" />
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

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Phone Number
                                </label>
                                <div className="input-group">
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="input-field"
                                        required
                                    />
                                    <FaPhoneFlip className="input-icon" />
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
                                        placeholder="Create a strong password"
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

                            {/* Terms */}
                            <div className="text-sm text-gray-600">
                                By creating an account, you agree to our{' '}
                                <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Privacy Policy
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
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link 
                                        to="/login" 
                                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                                    >
                                        Sign In
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

export default Register;