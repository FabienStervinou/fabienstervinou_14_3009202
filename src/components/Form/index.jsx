import './index.scss';
import React, { useState } from 'react';
import Fieldset from './ Fieldset/index.jsx';
import SelectForm from './SelectForm/index.jsx';
import { data } from '../../utils/data.js';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../features/employees/employeesSlice.js';
// MUI imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Form () {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
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
      <Box>
        <Stack spacing={2}>
          <TextField
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={(firstName) => {setFirstName(firstName.target.value);}}
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={lastName}
            onChange={(newValue) => {setLastName(newValue.target.value);}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              error={true}
              label="Date of Birth"
              inputFormat="DD/MM/YYYY"
              mask='__/__/____'
              value={dateOfBirth}
              onChange={(newValue) => {
                setDateOfBirth(newValue.format('DD/MM/YYYY'));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              mask='__/__/____'
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue.format('DD/MM/YYYY'));
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Stack>
        <Fieldset legend="Adresse">
          <TextField
            sx= {{ m:1 }}
            id="street"
            label="Street"
            value={street}
            onChange={(newValue) => {setStreet(newValue.target.value);}}
          />
          <TextField
            sx= {{ m:1 }}
            id="city"
            label="City"
            value={city}
            onChange={(newValue) => {setCity(newValue.target.value);}}
          />
          <SelectForm 
            options={data.states} 
            name="State" 
            label="State" 
            id="stateLocation" 
            value={stateLocation}
            onChange={(newValue) => setStateLocation(newValue.target.value)} 
          />
          <TextField
            id="zipCode"
            label="Zip Code"
            type="number"
            value={zipCode}
            onChange={(newValue) => setZipCode(newValue.target.value)} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Fieldset>
        <SelectForm options={data.department} name="Department" label="Department" id="department" value={department} onChange={(e) => setDepartment(e.target.value) } />
        <input type="submit" value="Save"/>
      </Box>
    </form>
  );
}

export default Form;