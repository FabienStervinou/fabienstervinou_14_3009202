import './index.scss';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Header () {
  const currentLocation = useLocation();
  const isActualLocationHome = currentLocation.pathname === '/';

  return (
    <header className='header'>
      <h1 className='headerTitle'>HRnet</h1>
      {
        isActualLocationHome 
          ? <NavLink className='headerLink' to='/employees'>View Current Employees</NavLink>
          : <NavLink className='headerLink' to='/'>Home</NavLink>
      }
    </header>
  );
}

export default Header;