import React from 'react';

const Input = ({ name, value, onChange, label, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input name={name} value={value} onChange={onChange} className="form-control" autoFocus={name === 'username' ? 'autoFocus' : null} />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
