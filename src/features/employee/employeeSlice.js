import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const { actions, reducer } = createSlice({
  name: 'employee',
  initialState,
  reducers : {
    addEmployee: {
      reducer: (state, action) => { console.log('log action :', action); state.push(action.employee); }
    }
  }
});

export const { addEmployee } = actions;
export default reducer;
