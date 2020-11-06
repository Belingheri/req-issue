import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ArrowOrder({ order }) {
  if (order !== "asc" && order !== "desc") return null;

  return <FontAwesomeIcon icon={order === "asc" ? faArrowUp : faArrowDown} />;
}

ArrowOrder.propTypes = {
  order: PropTypes.string.isRequired,
};

export default ArrowOrder;
