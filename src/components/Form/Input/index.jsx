import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

function Input (props) {
  return (
    <div className='input'>
      <label className='inputLabel' htmlFor={props.id}>{props.label}</label>
      <input 
        id={props.id}
        className='inputElement'
        type={props.type} 
        value={props.value}
        ref={props.ref}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      {props.error.isActive 
        ? <p className='inputError'>{props.error.message}</p>
        : <></>
      }
    </div>
  );
}

export default Input;

Input.defaultProps = {
  type: 'text',
  error: {
    isActive: false,
    message: ''
  }
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  ref: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.shape({
    isActive: PropTypes.bool,
    message: PropTypes.string
  })
};