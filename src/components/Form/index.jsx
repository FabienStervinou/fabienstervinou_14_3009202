import React, { useState } from 'react';
import Input from './Input/index.jsx';
import Fieldset from './ Fieldset/index.jsx';
import Select from './Select/index.jsx';
import { data } from '../../utils/data.js';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../features/employees/employeesSlice.js';

function Form () {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {firstName, lastName, dateOfBirth, startDate, street, city, stateLocation, zipCode, department};
    dispatch(addEmployee(employee));

    //TODO: verify if the employee is corectly added
    resetForm();
  };

  const resetForm = () => {
    const allInput = document.querySelectorAll('input');
    const allSelect = document.querySelectorAll('select');

    for (let i = 0; i < allInput.length; i++) {
      const input = allInput[i];
      if (input.type !== 'submit') {
        input.value = '';
      }
    }

    for (let i = 0; i < allSelect.length; i++) {
      const select = allSelect[i];
      select.selectedIndex = null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value) } />
      <Input type="text" label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value) } />
      <Input type="date" label="Date of Birth" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value) } />
      <Input type="date" label="Start Date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value) } />
      <Fieldset legend="Adresse">
        <Input type="text" label="Street" id="street" value={street} onChange={(e) => setStreet(e.target.value) } />
        <Input type="text" label="City" id="city" value={city} onChange={(e) => setCity(e.target.value) } />
        <Select 
          options={data.states} 
          name="State" 
          label="State" 
          id="stateLocation" 
          value={data.states[0]} 
          onChange={(e) => setStateLocation(e.target.value)} 
        />
        <Input type="number" label="Zip Code" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value) } />
      </Fieldset>
      <Select options={data.department} name="Department" label="Department" id="department" value={department} onChange={(e) => setDepartment(e.target.value) } />
      <input type="submit" value="Save"/>
    </form>
  );
}

export default Form;