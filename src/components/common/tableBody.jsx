import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

function TableBody({ data, columns }) {
  const renderCell = (row, item) => {
    if (item.content) return item.content(row);

    return _.get(row, item.path);
  };

  return (
    <tbody>
      {data.map((row) => (
        <tr key={uuidv4()}>
          {columns.map((item) => (
            <td key={uuidv4()}>{renderCell(row, item)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableBody;
