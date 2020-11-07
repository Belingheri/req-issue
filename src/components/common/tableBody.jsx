import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

function TableBody({ data, columns, proprietyId, onClickRow }) {
  const renderCell = (row, item) => {
    if (item.content) return item.content(row);

    return _.get(row, item.path);
  };

  return (
    <tbody>
      {data.map((row) => (
        <tr
          key={row[proprietyId]}
          onClick={(e) => {
            if (onClickRow) onClickRow(row);
          }}
        >
          {columns.map((item) => (
            <td key={row[proprietyId] + item.path}>{renderCell(row, item)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  proprietyId: PropTypes.string,
  onClickRow: PropTypes.func,
};

TableBody.defaultProps = {
  proprietyId: "_id",
};

export default TableBody;
