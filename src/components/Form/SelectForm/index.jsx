import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './index.scss';

function SelectForm (props) {
  return ( 
    <FormControl 
      sx={ props.sx || { m: 1, minWidth: 140, width: '100%' }}
    >
      <InputLabel id="demo-simple-select-autowidth-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="'select-' + props.name"
        value={props.value}
        onChange={props.onChange}
        autoWidth
        label={props.label}
      >
        {
          props.options.map((option, i) => (
            <MenuItem 
              value={option.name ? option.name : option}
              key={i}
            >
              {option.name ? option.name : option}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl> 
  );
}

export default SelectForm;

SelectForm.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  default: PropTypes.any,
  value: PropTypes.any,
  sx: PropTypes.any,
};