import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const TaskAlerts = ({ columns }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const newAlerts = [];
    columns.forEach((column) => {
      if (column.title === "To Do" || column.title === "On Progress") {
        column.tasks.forEach((task) => {
          const taskDueDate = new Date(task.dueDate).toISOString().split("T")[0];

          if (taskDueDate === today) {
            newAlerts.push({
              message: `Reminder: Task "${task.title}" is due today!`,
              severity: "info",
            });
          } else if (new Date(taskDueDate) < new Date(today)) {
            newAlerts.push({
              message: `Alert: Task "${task.title}" is overdue!`,
              severity: "error",
            });
          }
        });
      }
    });

    setAlerts(newAlerts);
  }, [columns]);

  return (
    <div>
      {alerts.map((alert, index) => (
        <Snackbar
          key={index}
          open
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
          
          onClose={() => {
            setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
          }}
        >
          <Alert
          className="font-semibold"
            severity={alert.severity}
            onClose={() => {
              setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
            }}
          >
            
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default TaskAlerts;
