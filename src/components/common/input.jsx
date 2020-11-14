import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, type, ...rest }) => {
  const getInputClass = () =>
    type === "range" ? "form-control-range my-2" : "form-control";
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === "textarea" && (
        <textarea {...rest} name={name} id={name} className="form-control" />
      )}
      {type !== "textarea" && (
        <input
          {...rest}
          type={type}
          name={name}
          id={name}
          className={getInputClass()}
        />
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
