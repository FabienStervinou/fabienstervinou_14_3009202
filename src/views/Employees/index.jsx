import React from 'react';
import {NavLink} from 'react-router-dom';

function Employees () {
  return ( 
    <>
      <header>
        <h1>HRnet</h1>
      </header>
      <main className="home">
        <NavLink to='/'>Home</NavLink>
      </main>
    </>
  );
}

export default Employees;