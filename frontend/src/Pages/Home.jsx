import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/signup.util";
import CodeReviewer from "../Components/CodeReviewer";
import { FaCode } from "react-icons/fa";

function Home(                                            ) {
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const user = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");

  // Close profile on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
     window.location.reload();
    handleSuccess("Logout successful!");
    
  };

  return (
    <div className="mx-auto h-screen scroll-x-hidden">
      <nav className="flex justify-between items-center h-15  w-[95%] mx-auto">
        <div>
          <Link to="/home" className="text-blue-900 font-bold 
          ">ReviewMate<FaCode className="inline-block text-red-900"/></Link>
        </div>

        <div className="flex items-center gap-4 relative" ref={profileRef}>
          {!token && (
            <Link to="/login">Login</Link>
          )}

          {/* User Icon */}
          <div onClick={() => setOpenProfile(!openProfile)}>
            {user ? (
              <div className="cursor-pointer rounded-full bg-amber-200 h-8 w-8 flex items-center justify-center text-xl text-black">
                {user.charAt(0).toUpperCase()}
              </div>
            ) : (
              <FaUserCircle className="cursor-pointer text-3xl" />
            )}
          </div>

          {/* Profile Dropdown */}
          {openProfile && token && (
            <div className="absolute right-0 top-10 w-48 bg-white border rounded-md shadow-lg z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm text-gray-700">Signed in as</p>
                <p className="font-semibold truncate text-black">{user}</p>
              </div>

              <ul className="text-sm">
                <li
                  className="px-4 py-2 text-gray-800 border-b border-t hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

          <CodeReviewer/>
     
    </div>
  );
}

export default Home;
