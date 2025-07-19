import { createSlice } from '@reduxjs/toolkit';
const viewSlice = createSlice({
  name: 'view',
  initialState: {
    viewMode: 'list',
  },
  reducers: {
    setView(state, action) {
      state.viewMode = action.payload
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;