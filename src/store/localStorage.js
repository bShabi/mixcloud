export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cloudMixStore');
    if (serializedState === null) {
      return undefined; // use default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cloudMixStore', serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
};