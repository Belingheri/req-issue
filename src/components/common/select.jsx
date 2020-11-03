import React from "react";
import PropTypes from "prop-types";
function Select({
  name,
  label,
  options,
  error,
  propretyName,
  propretyId,
  ...rest
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option[propretyId]} value={option[propretyId]}>
            {option[propretyName]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  propretyName: PropTypes.string,
  propretyId: PropTypes.string,
};

Select.defaultProps = {
  propretyName: "name",
  propretyId: "_id",
};

export default Select;
