import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Select from '../Form/Select/index.jsx';
import { changeEntries } from '../../features/entries/entriesSlice.js';

function Entries () {
  const dispatch = useDispatch();
  const entriesArray = [10, 25, 50, 100];
  const [entries, setEntries] = useState();

  const handleChange = (e) => {
    const paylaod = parseInt(e.target.value);
    setEntries(entries);
    dispatch(changeEntries(paylaod));
  };
  
  return (
    <div className='inputEntries'>
      <Select 
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