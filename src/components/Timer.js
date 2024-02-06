import React, { useState } from "react";

export default function Timer({
  initialTime,
  onTimeout,
  handleReload,
  numberOfQuestions,
  answeredQuestions,
  remainingQuestions,
  correctAnswer,
  wrongAnswer,
  negativeMark,
}) {
  const [time, setTime] = useState(initialTime);
  const [isFinished, setIsFinished] = useState(false);

  React.useEffect(() => {
    if (time <= 0) {
      onTimeout(isFinished ? "You've submitted the sheet." : null);
    } else {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line
  }, [time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2>{formatTime(time)}</h2>
      <p style={{ marginBottom: 0 }}>T: {numberOfQuestions}</p>
      <p style={{ marginBottom: 0 }}>A: {answeredQuestions}</p>
      <p style={{ marginBottom: 0 }}>R: {remainingQuestions}</p>

      {(isFinished || time === 0) && (
        <>
          <p style={{ marginBottom: 0 }}>C: {correctAnswer}</p>
          <p style={{ marginBottom: 0 }}>W: {wrongAnswer}</p>
          <p style={{ marginBottom: 0 }}>
            M: {correctAnswer - wrongAnswer * negativeMark}
          </p>
        </>
      )}
      <div>
        {!(isFinished || time === 0) && (
          <button
            type="button"
            className="btn btn-success mx-2"
            onClick={() => {
              setTime(0);
              setIsFinished(true);
            }}
          >
            Finish
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={handleReload}>
          Reload
        </button>
      </div>
    </div>
  );
}
