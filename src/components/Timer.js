import React, { useState } from "react";

export default function Timer({ initialTime, onTimeout, handleReload }) {
  const [time, setTime] = useState(initialTime);

  React.useEffect(() => {
    if (time <= 0) {
      onTimeout();
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
    <div className="mt-3 d-flex justify-content-between align-items-center">
      <h2>{formatTime(time)}</h2>
      <button type="button" className="btn btn-primary" onClick={handleReload}>
        Reload
      </button>
    </div>
  );
}
