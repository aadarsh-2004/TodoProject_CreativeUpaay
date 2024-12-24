import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { BiMessageSquareAdd } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuPanelBottom } from "react-icons/lu";
import { PiCirclesFourLight } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import img from "./img.png";
import { GoDotFill } from "react-icons/go";
import { TextField } from "@mui/material";
import TaskAlerts from "./TaskAlerts";

const TaskBoard = () => {
  // Columns Data
  const [columns, setColumns] = useState([
    {
      title: "To Do",
      color: "c084fc",
      tasks: [
        {
          id: 1,
          title: "Brainstorming",
          priority: "Low",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          comments: 12,
          files: 0,
          avatars: ["A"],
          dueDate: "2024-12-25",
        },
        {
          id: 2,
          title: "Research",
          priority: "High",
          description:
            "User research helps you to create an optimal product for users.",
          comments: 10,
          files: 3,
          avatars: ["X"],
          dueDate: "2024-12-26",
        },
      ],
    },
    {
      title: "On Progress",
      color: "fde047",
      tasks: [
        {
          id: 3,
          title: "Brainstorming",
          priority: "Low",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          comments: 12,
          files: 0,
          avatars: ["A"],
          dueDate: "2024-12-25",
        },
        {
          id: 4,
          title: "Research",
          priority: "High",
          description:
            "User research helps you to create an optimal product for users.",
          comments: 10,
          files: 3,
          avatars: ["X"],
          dueDate: "2024-12-25",
        },
      ],
    },
    {
      title: "Done",
      color: "4ade80",
      tasks: [
        {
          id: 5,
          title: "Brainstorming",
          priority: "Completed",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          comments: 12,
          files: 0,
          avatars: ["A"],
          dueDate: "2024-12-22",
        },
        {
          id: 6,
          title: "Research",
          priority: "Completed",
          description:
            "User research helps you to create an optimal product for users.",
          comments: 10,
          files: 3,
          avatars: ["X"],
          dueDate: "2024-12-21",
        },
        {
          id: 7,
          title: "Brainstorming",
          priority: "Completed",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          comments: 12,
          files: 0,
          avatars: ["A"],
          dueDate: "2024-12-23",
        },
      ],
    },
  ]);

  // Filter section
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#filterDropdown")) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownVisible]);

  // new Task Add
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  const addTask = () => {
    if (newTask.title && newTask.description) {
      const newTaskObj = {
        id: Date.now(),
        title: newTask.title,
        priority: newTask.priority,
        description: newTask.description,
        comments: 0,
        files: 0,
        avatars: [],
        dueDate: newTask.dueDate,
      };

      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        newColumns[0].tasks.push(newTaskObj);
        return newColumns;
      });

      setIsModalOpen(false);
      setNewTask({ title: "", description: "", priority: "Low", dueDate: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Drag and Drop
  const moveTask = (taskId, fromColumnIndex, toColumnIndex) => {
    const fromColumn = columns[fromColumnIndex];
    const toColumn = columns[toColumnIndex];
    const task = fromColumn.tasks.find((task) => task.id === taskId);
    fromColumn.tasks = fromColumn.tasks.filter((task) => task.id !== taskId);
    toColumn.tasks.push(task);

    const newColumns = [...columns];
    newColumns[fromColumnIndex] = fromColumn;
    newColumns[toColumnIndex] = toColumn;
    setColumns(newColumns);
  };

  const filteredTasks = (tasks) =>
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  const Column = ({ column, index }) => {
    const [, drop] = useDrop({
      accept: "task",
      drop: (item) => moveTask(item.id, item.fromColumnIndex, index),
    });

    return (
      <div
        ref={drop}
        key={index}
        className="bg-gray-50 shadow-lg shadow-gray-300 rounded-lg  flex flex-col max-h-screen"
        style={{ borderColor: `#${column.color}` }}
      >
        <div
          className={`flex items-center justify-between p-4 border-b-4`}
          style={{ borderColor: `#${column.color}` }}
        >
          <div className="flex  items-center justify-between gap-2 ">
            <GoDotFill color={`${column.color}`} />
            <div className="flex items-center  ">
              <span
                className={`w-3 h-3 rounded-full  bg-${column.color}-400`}
              ></span>
              <h2 className="text-lg font-bold text-gray-800">
                {column.title}
              </h2>
            </div>

            <span
              className={`px-2 py-1 text-xs bg-blue-200 rounded-full bg-${column.color}-100 text-${column.color}-700`}
            >
              {filteredTasks(column.tasks).length}
            </span>
          </div>
          {column.title === "To Do" && (
            <BiMessageSquareAdd
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer text-xl text-purple-600"
            />
          )}
        </div>
        <div className="p-4 space-y-4 overflow-y-auto">
          {filteredTasks(column.tasks).map((task) => (
            <TaskCard key={task.id} task={task} columnIndex={index} />
          ))}
        </div>
      </div>
    );
  };

  // Task card Component
  const TaskCard = ({ task, columnIndex }) => {
    const [, drag] = useDrag({
      type: "task",
      item: { id: task.id, fromColumnIndex: columnIndex },
    });

    return (
      <div
        ref={drag}
        className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-2"
        draggable
      >
        {/* Priority Badge */}
        <div className="flex  justify-between">
          <div
            className={`text-xs px-2 py-1 rounded-md w-fit font-semibold ${
              task.priority === "Low"
                ? "bg-orange-100 text-orange-600"
                : task.priority === "High"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {task.priority}
          </div>
          <BsThreeDots />
        </div>

        <div className="justify-start items-start flex flex-col ">
          {/* Task Title */}
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>

          {/* Task Description */}
          <p className=" text-sm text-left text-gray-600">{task.description}</p>
        </div>
        {/* Avatars and Meta Info */}
        <div className="flex items-center justify-between mt-4">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {task.avatars.slice(0, 3).map((avatar, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
              >
                <img
                  src={img}
                  alt={`Avatar ${avatar}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Comments and Files */}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a2.5 2.5 0 01-5 0V15a2.5 2.5 0 015 0v1.5z"
                />
              </svg>
              <span>{task.comments} comments</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v16m0-16l16 8-16 8"
                />
              </svg>
              <span>{task.files} files</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const avatarss = [{ src: { img }, alt: "User 1", bg: "#FDE68A" }];

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen relative z-50 top-12">
      {/* calling of alert componnent */}
      <TaskAlerts columns={columns} />

      {/* Upper section of Task board   */}
      <div className="flex items-start flex-col justify-between flex-wrap gap-4 mb-4">
        <div className="flex  justify-between items-center w-[1200px] ">
          <div className="flex gap-3 justify-center items-end">
            <h1 className="text-5xl font-bold text-gray-800">Mobile App</h1>

            <div className="flex gap-4 ">
              <FaRegPenToSquare
                size={25}
                color="blue"
                className="bg-purple-200 rounded-lg p-1"
              />
              <FaLink
                size={25}
                color="blue"
                className="bg-purple-200 rounded-lg p-1 "
              />
            </div>
          </div>
          {/* invite avatar */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-2 py-1 bg-purple-100 text-purple-500 font-medium rounded-lg text-sm hover:bg-purple-200">
              + Invite
            </button>
            <div className="flex items-center -space-x-2">
              {avatarss.map((avatar, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                  style={{ backgroundColor: avatar.bg }}
                >
                  <img
                    src={img}
                    alt={avatar.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-pink-100 text-pink-600 border-2 border-white text-sm font-semibold">
                +2
              </div>
            </div>
          </div>
        </div>

        <div className=" flex w-[1200px] mt-8 justify-between">
          <div className="flex gap-2">
            {/* filter button */}
            <div className=" " id="filterDropdown">
              <div className="flex gap-2 justify-center items-center px-4 py-2 bg-white border  border-gray-500 rounded-md hover:bg-gray-200">
                <CiFilter />
                <button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className=""
                >
                  Filter
                </button>
                <IoIosArrowDown />
              </div>
              {dropdownVisible && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setFilter("All")}
                    >
                      All
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setFilter("Low")}
                    >
                      Low Priority
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setFilter("Medium")}
                    >
                      Medium Priority
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setFilter("High")}
                    >
                      High Priority
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* today button */}
            <div className="  ">
              <div className="flex gap-2 justify-center items-center px-4 py-2 bg-white border  border-gray-500 rounded-md hover:bg-gray-200">
                <button>Today</button>
                <IoIosArrowDown />
              </div>
            </div>
          </div>

          {/* share button */}
          <div className="flex items-center gap-4 ">
            <div className="px-4  py-2  bg-white border border-gray-500 rounded-md flex justify-center items-center gap-2">
              <GrGroup />
              <button>Share </button>
            </div>

            <LuPanelBottom
              size={35}
              color="white"
              className="bg-violet-700 p-1 rounded-lg"
            />
            <PiCirclesFourLight size={35} />
          </div>
        </div>
      </div>

      {/* column section in taskboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {columns.map((column, index) => (
          <Column key={index} column={column} index={index} />
        ))}
      </div>

      {/* Add Task POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  p-6 rounded-lg  shadow-2xl w-[500px] ">
            <h3 className="text-3xl text-purple-600 font-semibold mb-4">
              ADD TASK
            </h3>
            <div className="mb-4 flex  flex-col items-start">
              <label className="block text-lg font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="mt-3 p-3 w-full border-[2px] border-gray-500  rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4 flex  flex-col items-start">
              <label className="block text-lg  font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="mt-3 block w-full border-[2px]  border-gray-500 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4 flex  flex-col items-start">
              <label className="block text-lg font-medium text-gray-700">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="mt-3 p-3  w-full border-[2px]  border-gray-500 rounded-md shadow-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <TextField
              className="border-gray-500 text-gray-700  border-[2px] "
              fullWidth
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              margin="normal"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
