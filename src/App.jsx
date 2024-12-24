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
  const [user, setUser] = useState(null); // Store the user object here

  // Checking User authentication and fetching user details
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user object when logged in
      } else {
        setUser(null); // Clear user object when logged out
      }
    });

    // Cleanup function to unsubscribe when component is unmounted
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login setUser={setUser} />; // Pass setUser to Login component
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
          {/* Navbar component Calling with user */}
          <Navbar user={user} toggleSidebar={toggleSidebar} />

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
