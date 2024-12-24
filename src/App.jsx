import "./App.css";
import Slidebar from "./component/Slidebar";
import Navbar from "./component/Navbar";

import TaskBoard from "./component/TaskBoard";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { auth } from "./firebase";
import Login from "./component/Login";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cheking User authentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Slidebar component Calling */}
      <div className="min-h-screen flex">
        <Slidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-28" : "ml-0"
          }`}
        >
          {/* Navbar component Calling */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Taskboard component Calling */}
          <DndProvider backend={HTML5Backend}>
            <TaskBoard isSidebarOpen={isSidebarOpen} />
          </DndProvider>
        </div>
      </div>
    </>
  );
}

export default App;
