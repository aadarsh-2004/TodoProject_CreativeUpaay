// Save state to localStorage
export const saveStateToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  };
  
  // Load state from localStorage
  export const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) return undefined; // No saved state, return undefined to use default state
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return undefined;
    }
  };
  