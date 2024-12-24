import React, { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import img from "./img.png"; // Replace with the user's avatar if needed
import { VscThreeBars } from "react-icons/vsc";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ toggleSidebar, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // SignOut Logic
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center border-b-2 border-gray-300 justify-between p-3 fixed top-0 left-0 w-full z-10 bg-white">
      <div
        className="flex justify-center items-center cursor-pointer space-x-4"
        onClick={toggleSidebar}
      >
        <h3 className="text-lg font-serif font-semibold ">Project M..</h3>
        <VscThreeBars />
      </div>

      {/* Middle search component */}
      <form className="flex p-1 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for anything..."
          className="flex-grow p-2 border-none outline-none rounded-lg bg-gray-200"
        />
      </form>

      <div className="flex justify-between items-center ">
        <div className="flex space-x-4 mr-14">
          <FaRegCalendar size={22} color="#6b7280" />
          <MdOutlineMessage size={25} color="#6b7280" />
          <FaRegBell size={25} color="#6b7280" />
        </div>

        {/* Profile Part */}
        <div className="flex items-center space-x-4">
          <div onClick={toggleDropdown} className="cursor-pointer">
            <h3>{user ? user.displayName : "Guest"}</h3>
            
            <h5 className="text-slate-500">{user ? user.email : ""}</h5>
          </div>
          <img
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            src={img} // Or you can use user.photoURL if it's available
            alt="Profile"
            onClick={toggleDropdown}
          />

          {isDropdownOpen && (
            <div className="absolute bg-white shadow-md rounded-md mt-2 w-40 right-0 p-2 border">
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:bg-gray-200 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
