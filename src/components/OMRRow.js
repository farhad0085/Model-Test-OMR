import React, { useState } from "react";

const options = ["a", "b", "c", "d"];

const OMRRow = ({ number, disableRow, setAnsweredQuestions, setAnswers }) => {
  const [isRowDisabled, setIsRowDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className={"mb-2"}>
      <div className="option-container">
        <div style={{ marginRight: "5px" }}>{number}.</div>
        {options.map((option) => (
          <div
            key={option}
            className={`option ${value === option && "selected"} ${
              isRowDisabled || disableRow ? "disabled-row" : ""
            }`}
            onClick={() => {
              setIsRowDisabled(true);
              setAnsweredQuestions(
                (answeredQuestions) => answeredQuestions + 1
              );
              setValue(option);
            }}
          >
            {option}
          </div>
        ))}
        {disableRow && value && (
          <>
            <div
              className={`option ${
                answer === "correct" ? "selected correct" : ""
              }`}
              onClick={() => {
                setAnswer("correct");
                setAnswers((c) => ({ ...c, [number]: "correct" }));
              }}
            >
              &#10003;
            </div>
            <div
              className={`option ${answer === "wrong" ? "selected wrong" : ""}`}
              onClick={() => {
                setAnswer("wrong");
                setAnswers((w) => ({ ...w, [number]: "wrong" }));
              }}
            >
              &#10005;
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OMRRow;
