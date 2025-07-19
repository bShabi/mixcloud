import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slices/searchSlice';
import viewReducer from '../slices/viewSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
export const store = configureStore({
  reducer: {
    search: searchReducer,
    view: viewReducer,
  },
  preloadedState: persistedState,
});
store.subscribe(() => {
  saveState({
    search: store.getState().search,
    view: store.getState().view
  });
});