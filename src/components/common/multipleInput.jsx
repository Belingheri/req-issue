import React from "react";
import PropTypes from "prop-types";
import SearchEditBox from "./searchEditBox";
function MultipleInput({
  name,
  label,
  options,
  values,
  onAdd,
  onRemove,
  error,
  propretyName,
  propretyId,
}) {
  const nowSelected = values.map((valore) =>
    options.find((opzione) => opzione[propretyId] === valore)
  );
  const renderItem = (item) => {
    return <h1>{`${item[propretyId]} - ${item[propretyName]}`}</h1>;
  };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <SearchEditBox
        items={options}
        proprietyId={propretyId}
        proprietyName={propretyName}
        onSelected={onAdd}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {nowSelected.map((e) => renderItem(e))}
    </div>
  );
}

MultipleInput.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  propretyName: PropTypes.string,
  propretyId: PropTypes.string,
};

MultipleInput.defaultProps = {
  propretyName: "name",
  propretyId: "_id",
};

export default MultipleInput;
