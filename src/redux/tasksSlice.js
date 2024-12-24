import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {
    todo: [],
    inProgress: [],
    done: [],
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.todo.push(action.payload); // Add task to "To Do" section
    },
    moveTask: (state, action) => {
      const { taskId, from, to } = action.payload;
      const taskIndex = state.tasks[from].findIndex((task) => task.id === taskId);
      const [task] = state.tasks[from].splice(taskIndex, 1); // Remove task from the current section
      state.tasks[to].push(task); // Add task to the new section
    },
    deleteTask: (state, action) => {
      const { taskId, section } = action.payload;
      state.tasks[section] = state.tasks[section].filter((task) => task.id !== taskId); // Remove task
    },
  },
});

export const { addTask, moveTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
