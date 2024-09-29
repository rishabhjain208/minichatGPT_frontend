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
    <nav className="bg-[#212121] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center ml-52 h-10 w-auto">
          <img src={logo} alt="Logo" />
        </div>

        <div className="flex items-center space-x-4">
          {email ? (
            <div className="relative">
              <div
                className="w-12 h-12 bg-slate-300 rounded-full flex justify-center items-center cursor-pointer"
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
                className="bg-white text-[#212121] font-medium border rounded-xl px-[10px] py-[5px]  transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#ECECEC] font-medium px-[10px] py-[5px] border rounded-xl  transition duration-300"
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
