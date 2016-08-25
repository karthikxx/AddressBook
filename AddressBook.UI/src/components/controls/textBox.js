import React, {PropTypes} from 'react';

const TextBox = ({name, label, onChange, placeholder, value, error}) => {
  let divClass = 'form-group';
  if (error && error.length > 0) {
    divClass += " " + 'has-error';
  }

  return (
    <div className={divClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextBox;
