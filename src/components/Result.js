import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";

function Result(props) {
  return (
    props.quizResult && (
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

Result.propTypes = {
  quizResult: PropTypes.object.isRequired
};

export default Result;
