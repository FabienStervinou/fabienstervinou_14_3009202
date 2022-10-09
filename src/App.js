import React from 'react';
import './App.css';
import Home from '../src/views/Home/index.jsx';
import Employees from '../src/views/Employees/index.jsx';
import Error from '../src/views/Error/index.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/employees" element={<Employees/>} />
          <Route exact path="/404" element={<Error/>} /> 
          <Route path="*" element={<Navigate to="/404" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
