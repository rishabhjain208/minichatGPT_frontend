import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = ({ authToken, setAuthToken, email, setEmail }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setEmail(null);
    navigate("/login");
  };

  return (
    <nav className="bg-[#212121] py-2 shadow-lg">
      {" "}
      {/* Reduced padding to py-2 */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Left placeholder to help center the logo */}
        <div className="flex-1"></div>

        {/* Centered logo with increased size and adjusted margin */}
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Logo" className="h-[100px] w-auto" />{" "}
          {/* Set to h-16 for balance */}
        </div>

        {/* Right section with login/signup or profile */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          {email ? (
            <div className="relative">
              <div
                className="w-12 h-12 bg-slate-300 rounded-full flex justify-center items-center cursor-pointer mr-5"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="text-2xl text-white text-center">
                  {email.charAt(0).toUpperCase()}
                </span>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-[#212121] font-medium border rounded-full px-4 py-2 transition duration-300 hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#ECECEC] font-medium px-4 py-2 border rounded-full border-[#ECECEC] transition duration-300 hover:bg-gray-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
