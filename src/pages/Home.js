import React, { useState } from "react";
import { Container } from "react-bootstrap";
import OMRSheet from "../components/OMRSheet";

const Home = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("0");
  const [showOMR, setShowOMR] = useState(false);
  const [negativeMark, setNegativeMark] = useState("0.5")

  const handleStart = () => {
    if (numberOfQuestions && minutes && seconds) {
      setShowOMR(true);
    } else {
      alert("Please enter the number of questions and time.");
    }
  };

  const handleReload = () => {
    setNumberOfQuestions("10");
    setMinutes("10");
    setSeconds("0");
    setShowOMR(false);
  };

  return (
    <Container>
      {showOMR ? (
        <div>
          <OMRSheet
            numberOfQuestions={parseInt(numberOfQuestions)}
            negativeMark={negativeMark}
            minutes={minutes}
            seconds={seconds}
            handleReload={handleReload}
          />
        </div>
      ) : (
        <div>
          <h1 className="mt-3">OMR Sheet App</h1>
          <div className="row mt-3">
            <div className="col-md-3">
              <label htmlFor="numberOfQuestions" className="form-label">
                Number of Questions:
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfQuestions"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="numberOfQuestions" className="form-label">
                Negative Mark Per Question:
              </label>
              <input
                type="number"
                className="form-control"
                id="negativeMark"
                value={negativeMark}
                onChange={(e) => setNegativeMark(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="minutes" className="form-label">
                Minutes:
              </label>
              <input
                type="number"
                className="form-control"
                id="minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="seconds" className="form-label">
                Seconds:
              </label>
              <input
                type="number"
                className="form-control"
                id="seconds"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Home;
