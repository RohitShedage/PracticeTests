import React from "react";
import Timer from "./Timer";

function QuestionCount(props) {
  return (
    <div className="questionCount">
      <div>{`Question ${props.counter} of ${props.total}`}</div>
      <div>
        Time Spent <Timer timeInSeconds={props.timeSpent} />
      </div>
    </div>
  );
}

export default QuestionCount;
