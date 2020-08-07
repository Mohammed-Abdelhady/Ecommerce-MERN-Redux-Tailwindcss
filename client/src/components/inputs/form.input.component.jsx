import React, { Fragment } from 'react';

const FormInput = ({ title, type, placeholder, value, handleChange }) => {
  return (
    <Fragment>
      <label
        className='block uppercase tracking-wide 
        text-gray-700 text-xs font-bold mb-2'
        htmlFor={`form-${title}`}
      >
        {title}
      </label>
      <input
        className='appearance-none block w-full bg-gray-200
         text-gray-700 border border-gray-400 rounded
          py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
        id={`form-${title}`}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        // required
      />
    </Fragment>
  );
};

export default FormInput;
