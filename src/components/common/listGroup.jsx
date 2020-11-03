import React from "react";
import PropTypes from "prop-types";

function ListGroup({
  itemList,
  selectedItem,
  onChange,
  proprietyName,
  proprietyKey,
}) {
  const getClasses = (e) =>
    e === selectedItem ? "list-group-item active" : "list-group-item";

  return (
    <ul className="list-group">
      {itemList.map((e) => (
        <li
          key={e[proprietyKey] || 1}
          className={getClasses(e)}
          onClick={() => {
            if (selectedItem !== e) onChange(e);
          }}
        >
          {e[proprietyName]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.propTypes = {
  itemList: PropTypes.array.isRequired,
  selectedItem: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  proprietyName: PropTypes.string,
  proprietyKey: PropTypes.string,
  noFilterValue: PropTypes.string,
};

ListGroup.defaultProps = {
  proprietyName: "name",
  proprietyKey: "_id",
};

export default ListGroup;
