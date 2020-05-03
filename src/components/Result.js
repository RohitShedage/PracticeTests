import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

function Result(props) {
  return (
    props.quizResult.displayResult && (
      <CSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div>
          You scored{" "}
          <strong>
            {(props.quizResult.correct / props.quizResult.total) * 100}
            {"%"}
          </strong>
        </div>
      </CSSTransitionGroup>
    )
  );
}

export default Result;
