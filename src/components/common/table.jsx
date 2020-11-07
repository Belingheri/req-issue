import React from "react";
import PropTypes from "prop-types";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table({ columns, sortedColumn, onSort, data, onClickRow }) {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} onClickRow={onClickRow} />
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortedColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onClickRow: PropTypes.func,
};

export default Table;
