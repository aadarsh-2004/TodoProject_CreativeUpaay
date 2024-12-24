
import { IoHomeOutline } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { CgAddR } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";

export default function Slidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Project M.</h3>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul>
          <li className="flex items-center p-3 hover:bg-gray-100">
            <IoHomeOutline color="#6b7280" />
            <span className="ml-3 text-gray-500 font-normal">Home</span>
          </li>
          <li className="flex items-center p-3 hover:bg-gray-100">
            <LuMessageSquareText color="#6b7280" />
            <span className="ml-3 text-gray-500 font-normal">Messages</span>
          </li>
          <li className="flex items-center p-3 hover:bg-gray-100">
            <FaTasks color="#6b7280" />
            <span className="ml-3 text-gray-500 font-normal">Tasks</span>
          </li>
          <li className="flex items-center p-3 hover:bg-gray-100">
            <AiOutlineTeam color="#6b7280" />
            <span className="ml-3 text-gray-500 font-normal">Members</span>
          </li>
          <li className="flex items-center p-3 hover:bg-gray-100">
            <IoSettingsOutline color="#6b7280" />
            <span className="ml-3 text-gray-500 font-normal">Settings</span>
          </li>
        </ul>
      </nav>

      {/* My Projects Section */}
      <div className="border-t border-gray-200 mt-2"></div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-600">My Projects</h4>
          <CgAddR />
        </div>
        <ul className="mt-4">
          <li className="flex items-center p-2 rounded-lg bg-purple-100 hover:bg-gray-100">
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            <div className="flex items-center gap-20">
            <span className=" text-gray-700">Mobile App</span>
            <BsThreeDots />
            </div>
          </li>
          <li className="flex items-center p-2 rounded-lg hover:bg-gray-100">
            <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span>
            <span className="text-gray-700">Website Redesign</span>
          </li>
          <li className="flex items-center p-2 rounded-lg hover:bg-gray-100">
            <span className="w-2 h-2 mr-2 bg-purple-400 rounded-full"></span>
            <span className="text-gray-700">Design System</span>
          </li>
          <li className="flex items-center p-2 rounded-lg hover:bg-gray-100">
            <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
            <span className="text-gray-700">Wireframes</span>
          </li>
        </ul>
      </div>

      {/* Close Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
}
