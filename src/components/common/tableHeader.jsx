import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { invertSortType } from "../../util/sorter";

import ArrowOrder from "./arrowOrder";

function TableHeader({ columns, sortedColumn, onSort }) {
  const handleSort = (path) => {
    let newSortedColumn = { ...sortedColumn };
    if (path === newSortedColumn.path)
      newSortedColumn.order = invertSortType(newSortedColumn.order);
    else newSortedColumn = { path, order: "asc" };
    onSort(newSortedColumn);
  };

  return (
    <thead>
      <tr>
        {columns.map((el) => (
          <th
            key={uuidv4()}
            onClick={() => {
              if (el.path) handleSort(el.path);
            }}
          >
            {el.value}
            <ArrowOrder
              order={sortedColumn.path === el.path ? sortedColumn.order : ""}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortedColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
