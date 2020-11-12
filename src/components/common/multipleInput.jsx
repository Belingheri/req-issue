import React from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

import SearchEditBox from "./searchEditBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const realOptions = _.differenceBy(options, nowSelected, propretyId);
  const renderItem = (item) => {
    return (
      <li key={item[propretyId]}>
        {item[propretyName]}
        <button
          className="btn btn-outline-danger m-2"
          onClick={(e) => handleRemove(e, item[propretyId])}
        >
          <FontAwesomeIcon icon={faUserMinus} />
        </button>
      </li>
    );
  };
  const handleRemove = (e, value) => {
    e.preventDefault();
    onRemove(value);
  };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <SearchEditBox
        items={realOptions}
        proprietyId={propretyId}
        proprietyName={propretyName}
        onSelected={onAdd}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <ol>{nowSelected.map((e) => renderItem(e))}</ol>
    </div>
  );
}

MultipleInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  error: PropTypes.string,
  propretyName: PropTypes.string,
  propretyId: PropTypes.string,
};

MultipleInput.defaultProps = {
  propretyName: "name",
  propretyId: "_id",
};

export default MultipleInput;
