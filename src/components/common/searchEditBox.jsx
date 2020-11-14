import React, { useState, useRef } from "react";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function SearchEditBox({
  items,
  onSelected,
  label,
  proprietyId,
  proprietyName,
}) {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");
  const textInput = useRef(null);
  const results = items.filter((e) =>
    e[proprietyName].toUpperCase().includes(term.toUpperCase())
  );
  const handleChange = ({ currentTarget }) => {
    setTerm(currentTarget.value);
    setError("");
  };
  const handleOkRicerca = (e) => {
    e.preventDefault();
    const selectedElement = items.find(
      (e) => e[proprietyName] === textInput.current.value
    );
    if (selectedElement) onSelected(selectedElement[proprietyId]);
    else setError("Seleziona un valore suggerito");
  };
  return (
    <div>
      <h4>{label}</h4>
      <Combobox aria-label="Cities">
        <ComboboxInput
          className="city-search-input"
          onChange={handleChange}
          selectOnClick={true}
          autocomplete={false}
          ref={textInput}
        />
        {results && (
          <ComboboxPopover className="shadow-popup">
            {results.length > 0 ? (
              <ComboboxList>
                {results.slice(0, 10).map((result, index) => (
                  <ComboboxOption key={index} value={result[proprietyName]}>
                    {/* {result[proprietyName]}
                    <ComboboxOptionText /> */}
                  </ComboboxOption>
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                Nessun risultato 😢😢
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>

      <button className="btn btn-secondary" onClick={handleOkRicerca}>
        Ok
      </button>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
export default SearchEditBox;
