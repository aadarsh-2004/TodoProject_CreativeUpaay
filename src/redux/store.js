import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from './localstorage';


const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    tasks: tasksReducer, 
  },
  preloadedState, 
});


store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
