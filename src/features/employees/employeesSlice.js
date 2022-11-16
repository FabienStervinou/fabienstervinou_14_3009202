import { createAction, createSlice } from '@reduxjs/toolkit';
import { mokedData } from '../../utils/mokedData.js';

export const addEmployeeError = createAction('setExpensesError');

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: mokedData,
    employeesQuery: mokedData,
    query: ''
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      state.employeesQuery.push(action.payload);
    },
    getEmployeesByQuery: (state, action) => {
      const q = action.payload.toLowerCase();
      if (q.length <= 1) { state.employeesQuery = state.employees;}
      const userPressDeleteKey = q.length < state.query.length;
      state.query = q;

      if (q.split(' ').length === 1) {
        const response = state.employees.filter(value => {
          return value.firstName.toLowerCase().match(new RegExp(q, 'g')) ||
          value.lastName.toLowerCase().match(new RegExp(q, 'g')) ||
          value.startDate?.toLowerCase().match(new RegExp(q, 'g')) ||
          value.department.toLowerCase().match(new RegExp(q, 'g')) ||
          value.dateOfBirth?.toLowerCase().match(new RegExp(q, 'g')) ||
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
          const stateQuery = userPressDeleteKey ? state.employees : state.employeesQuery;
          const response = stateQuery.filter(value => {
            return value.firstName.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.lastName.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.startDate?.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.department.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.dateOfBirth?.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.street.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.city.toLowerCase().match(new RegExp(qElement, 'g')) ||
            value.stateLocation.toLowerCase().match(new RegExp(qElement, 'g'));
          });
          res = [...res, ...response];
        }

        const hasDuplicates = (array) => {
          return new Set(array).size !== array.length;
        }; 

        let filteredArr = [...res];
        while (hasDuplicates(filteredArr) == true) {
          const seen = new Set();

          let filterRes = filteredArr.filter((el) => {
            const duplicate = seen.has(el.id);
            seen.add(el.id);
            return duplicate;
          });

          filteredArr = filterRes;
        }

        state.employeesQuery = filteredArr;
      }
    },
    orderEmployeeByColumn: (state, action) => {
      const orderName = action.payload.orderName;
      const order = action.payload.order;
      let response;

      if (orderName === 'startDate' || orderName === 'dateOfBirth') {
        if (order === 'asc') {
          response = [...state.employeesQuery].sort((a,b) => {
            let aa = a[orderName].split('/').reverse().join();
            let bb = b[orderName].split('/').reverse().join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
          });
        } else if (order === 'desc') {
          response = [...state.employeesQuery].sort((a,b) => {
            let aa = a[orderName].split('/').reverse().join();
            let bb = b[orderName].split('/').reverse().join();
            return aa > bb ? -1 : (aa < bb ? 1 : 0);
          });
        }
      } else {
        if (order === 'asc') {
          response = [...state.employeesQuery].sort((a, b) =>
            a[orderName] < b[orderName] ? -1 : 1
          );
        } else if (order === 'desc') {
          response = [...state.employeesQuery].sort((a, b) =>
            a[orderName] > b[orderName] ? -1 : 1
          );
        } else {
          return;
        }
      }

      state.employeesQuery = response;
    }
  }
});

export const { addEmployee, getEmployeesByQuery, orderEmployeeByColumn } = employeesSlice.actions;
export default employeesSlice.reducer;
