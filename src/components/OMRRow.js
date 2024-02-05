import React, { useState } from "react";

const options = ["a", "b", "c", "d"];

const OMRRow = ({ number, disableRow }) => {
  const [isRowDisabled, setIsRowDisabled] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div
      className={`mb-2 ${isRowDisabled || disableRow ? "disabled-row" : ""}`}
    >
      <div className="option-container">
        <div style={{ marginRight: "5px" }}>{number}.</div>
        {options.map((option) => (
          <div
            key={option}
            className={`option ${value === option && "selected"}`}
            onClick={() => {
              setIsRowDisabled(true);
              setValue(option);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OMRRow;
