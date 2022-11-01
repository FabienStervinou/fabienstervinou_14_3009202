import './style.scss';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layout/Header/index';
import Entries from '../../components/Entries/index';
import { getEmployeesByQuery, orderEmployeeByColumn } from '../../features/employees/employeesSlice';
import Pagination from '../../components/Pagination';
import { Arrow } from '../../assets/svgs/arrow.jsx';

function Employees () {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employeesQuery);
  const entriesParams = useSelector((state) => state.entries.entries);
  const [searchTerm, setSearchTerm] = useState('');

  // pagination logic
  const totalEmployees = employees.length;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * entriesParams;
    const lastPageIndex = firstPageIndex + entriesParams;
    return employees.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, entriesParams, employees]);
  
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length >= 1) {
      const queryRequest = query.trim();
      
      dispatch(getEmployeesByQuery(queryRequest));
    }
  };

  const toggleOrder = (e) => {
    const targetClass = e.target.classList;
    const orderName = e.target.dataset.name;
    const isActive = targetClass.contains('isActive');
    let order = '';

    if (!isActive) {
      targetClass.add('isActive');
      order = 'asc';
      dispatch(orderEmployeeByColumn({orderName, order}));

    } else if (isActive && !targetClass.contains('down')) {
      targetClass.add('down');
      order = 'desc';
      dispatch(orderEmployeeByColumn({orderName, order}));

    } else if (isActive && targetClass.contains('down')) {
      targetClass.remove('isActive');
      targetClass.remove('down');
    }
  };

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
              <th onClick={toggleOrder} data-name='firstName'>FirstName <Arrow /></th>
              <th onClick={toggleOrder} data-name='lastName'>LastName <Arrow /></th>
              <th onClick={toggleOrder} data-name='startDate'>Start Date <Arrow /></th>
              <th onClick={toggleOrder} data-name='department'>Department <Arrow /></th>
              <th onClick={toggleOrder} data-name='dateOfBirth'>Date of Birth <Arrow /></th>
              <th onClick={toggleOrder} data-name='street'>Street <Arrow /></th>
              <th onClick={toggleOrder} data-name='city'>City <Arrow /></th>
              <th onClick={toggleOrder} data-name='stateLocation'>State <Arrow /></th>
              <th onClick={toggleOrder} data-name='zipCode'>Zip Code <Arrow /></th>
            </tr>
            {
              currentTableData.map((employee, i) => {
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

        <Pagination
          className="paginationbar"
          currentPage={currentPage}
          totalCount={totalEmployees}
          pageSize={entriesParams}
          onPageChange={page => setCurrentPage(page)}
        />

      </main>
    </>
  );
}

export default Employees;