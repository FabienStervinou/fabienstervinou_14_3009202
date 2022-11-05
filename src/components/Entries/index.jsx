import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import SelectForm from '../Form/SelectForm/index.jsx';
import { changeEntries } from '../../features/entries/entriesSlice.js';

function Entries () {
  const dispatch = useDispatch();
  const entriesArray = [10, 25, 50, 100];
  const [entries, setEntries] = useState(10);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    const paylaod = parseInt(newValue);
    setEntries(newValue);
    dispatch(changeEntries(paylaod));
  };
  
  return (
    <div className='inputEntries'>
      <SelectForm
        name="entries"
        label="Show entries by"
        options={entriesArray}
        onChange={handleChange} 
        value={entries}
      />
    </div>
  );
}

export default Entries;

Entries.propTypes = {
  entrie: PropTypes.number
};