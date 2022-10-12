import React from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../../components/Form/index.jsx';

function Home () {
  return ( 
    <>
      <header>
        <h1>HRnet</h1>
      </header>
      <main className="home">
        <NavLink to='/employees'>View Current Employees</NavLink>
        <h2>Create employee</h2>
        <Form />
      </main>
    </>
  );
}

export default Home;