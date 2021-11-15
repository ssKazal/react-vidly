import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} id={name} {...rest} className="form-select">
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Select;
