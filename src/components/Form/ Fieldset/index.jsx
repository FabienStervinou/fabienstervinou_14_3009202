import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

function  Fieldset (props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldsetLegend">{props.legend}</legend>
      { props.children }
    </fieldset>
  );
}

export default  Fieldset;

Fieldset.propTypes = {
  children: PropTypes.any,
  legend: PropTypes.string
};