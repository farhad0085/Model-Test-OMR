import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import OMRRow from "./OMRRow";
import Timer from "./Timer";

export default function OMRSheet({
  numberOfQuestions,
  minutes,
  seconds,
  negativeMark,
  handleReload,
}) {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleTimeout = (message) => {
    confirmAlert({
      title: message || "Time's up!",
      message: "",
      buttons: [
        {
          label: "OK",
          onClick: () => {
            setIsTimeUp(true);
          },
        },
      ],
    });
  };

  const { correct: correctCount, wrong: wrongCount } = Object.values(
    answers
  ).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  function chunkArray(chunkSize) {
    const questions = Array.from(
      { length: numberOfQuestions },
      (_, index) => index + 1
    );
    const chunkedArray = [];
    for (let i = 0; i < questions.length; i += chunkSize) {
      const chunk = questions.slice(i, i + chunkSize);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  }

  return (
    <div style={{ position: "relative" }}>
      <div className="timerWrapper">
        <Timer
          initialTime={parseInt(minutes) * 60 + parseInt(seconds)}
          onTimeout={handleTimeout}
          handleReload={handleReload}
          numberOfQuestions={numberOfQuestions}
          answeredQuestions={answeredQuestions}
          remainingQuestions={numberOfQuestions - answeredQuestions}
          correctAnswer={correctCount}
          wrongAnswer={wrongCount}
          negativeMark={negativeMark}
        />
      </div>

      <div className="mt-3">
        <form>
          <Row>
            {chunkArray(10).map((col, index) => (
              <Col className="mb-4" md={3} sm={12} key={index}>
                {col.map((value) => (
                  <OMRRow
                    setAnsweredQuestions={setAnsweredQuestions}
                    setAnswers={setAnswers}
                    disableRow={isTimeUp}
                    key={value}
                    number={value}
                  />
                ))}
              </Col>
            ))}
          </Row>
        </form>
      </div>
    </div>
  );
}
