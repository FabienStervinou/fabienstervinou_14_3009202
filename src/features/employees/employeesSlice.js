import { createAction, createSlice } from '@reduxjs/toolkit';
import { mokedData } from '../../utils/mokedData.js';

export const addEmployeeError = createAction('setExpensesError');

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: mokedData,
    employeesQuery: mokedData
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    getEmployeesByQuery: (state, action) => {
      const q = action.payload.toLowerCase();

      if (q.split(' ').length === 1) {
        const response = state.employees.filter(value => {
          return value.firstName.toLowerCase().match(new RegExp(q, 'g')) ||
          value.lastName.toLowerCase().match(new RegExp(q, 'g')) ||
          value.startDate.toLowerCase().match(new RegExp(q, 'g')) ||
          value.department.toLowerCase().match(new RegExp(q, 'g')) ||
          value.dateOfBirth.toLowerCase().match(new RegExp(q, 'g')) ||
          value.street.toLowerCase().match(new RegExp(q, 'g')) ||
          value.city.toLowerCase().match(new RegExp(q, 'g')) ||
          value.stateLocation.toLowerCase().match(new RegExp(q, 'g'));
        });
        state.employeesQuery = response;
      } else {
        const qArray = q.split(' ');
        let res = [];

        for (let i = 0; i < qArray.length; i++) {
          const qElement = qArray[i];
          const stateQuery = state.employeesQuery ? state.employeesQuery : state.employees;

          const response = stateQuery.filter(value => {
            return value.firstName.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.lastName.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.startDate.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.department.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.dateOfBirth.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.street.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.city.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.stateLocation.toLowerCase().match(new RegExp(qElement, 'g'));
          });
          res = [...res, ...response];
        }

        const hasDuplicates = (array) => {
          return new Set(array).size !== array.length;
        }; 

        // TODO: Remove only for test 
        let i = 0;
        let filteredArr = [...res];
        while (hasDuplicates(filteredArr) == true) {
          const seen = new Set();
          i++;
          let filterRes = filteredArr.filter((el) => {
            const duplicate = seen.has(el.id);
            seen.add(el.id);
            return duplicate;
          });
          filteredArr = filterRes;

          // TODO: Remove only for test 
          if (i === 10) {
            break;
          }
        }

        state.employeesQuery = filteredArr;
      }
    }
  }
});

export const { addEmployee, getEmployeesByQuery } = employeesSlice.actions;
export default employeesSlice.reducer;
