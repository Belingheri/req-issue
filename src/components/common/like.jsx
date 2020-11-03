import React from "react";
import PropTypes from "prop-types";

function Like({ liked, onClick }) {
  const getClass = () => {
    let className = "fa fa-heart";
    className += liked ? "" : "-o";
    return className;
  };

  return <i className={getClass()} onClick={onClick}></i>;
}

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Like;
