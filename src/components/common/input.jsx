import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, type, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === "textarea" && (
        <textarea {...rest} name={name} id={name} className="form-control" />
      )}
      {type !== "textarea" && (
        <input {...rest} name={name} id={name} className="form-control" />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
};

export default Input;
