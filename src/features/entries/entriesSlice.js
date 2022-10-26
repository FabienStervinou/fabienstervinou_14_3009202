import { createSlice } from '@reduxjs/toolkit';

const entriesSlice = createSlice({
  name: 'entries',
  initialState: {
    entries: 10
  },
  reducers: {
    changeEntries: (state, action) => {
      state.entries = action.payload;
    }
  }
});

export const { changeEntries } = entriesSlice.actions;
export default entriesSlice.reducer;
