import React from 'react';
import PropTypes from 'prop-types';

function  Fieldset (props) {
  return (
    <fieldset>
      <legend>{props.legend}</legend>
      { props.children }
    </fieldset>
  );
}

export default  Fieldset;

Fieldset.propTypes = {
  children: PropTypes.any,
  legend: PropTypes.string
};