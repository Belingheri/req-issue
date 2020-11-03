import React from "react";
import PropTypes from "prop-types";

function SearchBox({ query, onSearch, placeholder: placeholderText }) {
  return (
    <input
      type="text"
      name="search"
      id="search"
      value={query}
      placeholder={placeholderText}
      onChange={({ currentTarget }) => onSearch(currentTarget.value)}
      className="form-control my-3"
    />
  );
}
SearchBox.propTypes = {
  query: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBox.defaultProps = {
  placeholder: "Search ...",
};
export default SearchBox;
