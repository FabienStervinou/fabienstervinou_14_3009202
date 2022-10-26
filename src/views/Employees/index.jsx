import './style.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layout/Header/index';
import Entries from '../../components/Entries/index';
import { getEmployeesByQuery } from '../../features/employees/employeesSlice';

function Employees () {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employeesQuery);
  const entriesParams = useSelector((state) => state.entries.entries);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length >= 2) {
      const queryRequest = query.trim();
      
      dispatch(getEmployeesByQuery(queryRequest));
    }
  };

  if (entriesParams) {
    employees.slice(0, entriesParams);
  }

  return ( 
    <>
      <Header />
      <main className="employees">

        <div className="employees-topTools">
          <Entries />
          <div className='inputSearch'>
            <label className='inputSearch-text' htmlFor='search'>Search :</label>
            <input
              id="search"
              className='inputSearch-button'
              type="search"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* TODO: remove only for debug */}
        <p style={{color: 'white', backgroundColor:'#31c17c', padding: '10px', fontWeight:'700', fontSize:'20px'}}>{employees.length} employés</p>

        <table>
          <tbody>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
            {
              employees.map((employee, i) => {
                return <tr key={i}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.stateLocation}</td>
                  <td>{employee.zipCode}</td>
                </tr>;
              })
            }
          </tbody>
        </table>

      </main>
    </>
  );
}

export default Employees;