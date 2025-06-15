import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Briefcase, LogOut, Sun, Moon } from "lucide-react";

const Navbar = ({ theme, setTheme }) => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
  console.log("Authorized:", isAuthorized);
  console.log("User:", user);
}, [isAuthorized, user]);


  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="text-white text-xl md:text-2xl font-bold hover:text-blue-100 transition-colors duration-200 cursor-pointer">
              Job Listings Board
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Create Job (only for employer)
            {isAuthorized && user?.role === "employer" && (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Job
              </Link>
            )} */}

            {/* User Info & Logout */}
            {isAuthorized && user && (
              <>
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block font-medium">
                    {user.fullname}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
