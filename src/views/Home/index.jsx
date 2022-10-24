import React from 'react';
import Form from '../../components/Form/index.jsx';
import Header from '../../layout/Header/index';

function Home () {
  return ( 
    <>
      <Header />
      <main className="home">
        <h2>Create employee</h2>
        <Form />
      </main>
    </>
  );
}

export default Home;