import React from "react";
import PropTypes from "prop-types";

function ArrowOrder({ order }) {
  if (order !== "asc" && order !== "desc") return null;

  const getClass = () => {
    let className = "fa fa-arrow-";
    className += order === "asc" ? "down" : "up";
    return className;
  };

  return <i className={getClass()} aria-hidden="true"></i>;
}

ArrowOrder.propTypes = {
  order: PropTypes.string.isRequired,
};

export default ArrowOrder;
