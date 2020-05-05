import React from "react";
import { connect } from "react-redux";

const Controls = props => {
  return (
    <div className="controls">
      {props.questionId !== 1 && (
        <button onClick={props.onPreviousQuestion}>Previous Question</button>
      )}
      {props.questionId === props.questionTotal || (
        <button onClick={props.onNextQuestion}>Next Question</button>
      )}
      <button onClick={props.onSubmitTest}>Submit Test</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    questionId: state.counter + 1,
    questionTotal: state.questions.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNextQuestion: () => dispatch({ type: "NEXT_QUESTION" }),
    onPreviousQuestion: () => dispatch({ type: "PREV_QUESTION" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
