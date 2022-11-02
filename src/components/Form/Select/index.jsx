import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Select (props) {
  return ( 
    <>
      <label htmlFor={'select-' + props.name}>{props.label}</label>
      <select 
        name={props.name} 
        id={'select-' + props.name} 
        value={props.value} 
        onChange={props.onChange}
        default={props.default ? props.default : props.options[0]}
      >
        {
          props.options.map((option, i) => (
            <option 
              value={option.name ? option.name : option} 
              key={i}
            >
              {option.name ? option.name : option}
            </option>
          ))
        }
      </select>
    </>
  );
}

export default Select;

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  default: PropTypes.any,
  value: PropTypes.any,
};