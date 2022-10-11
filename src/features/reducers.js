import { combineReducers } from 'redux';
import employeeSlice from '../features/employee/employeeSlice.js';

export default combineReducers({
  employee: employeeSlice
});
