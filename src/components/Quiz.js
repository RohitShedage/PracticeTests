import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import Question from "../components/Question";
import QuestionCount from "../components/QuestionCount";
import AnswerOption from "../components/AnswerOption";

function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    props.displayQuiz && (
      <CSSTransitionGroup
        className="container"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div key={props.questionId}>
          <QuestionCount
            counter={props.questionId}
            total={props.questionTotal}
            timeSpent={props.timeSpent}
          />
          <Question content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
          <div className="controls">
            {props.questionId !== 1 && (
              <button onClick={props.onPreviousQuestion}>
                Previous Question
              </button>
            )}
            {props.questionId === props.questionTotal || (
              <button onClick={props.onNextQuestion}>Next Question</button>
            )}
            <button onClick={props.onSubmitTest}>Submit Test</button>
          </div>
        </div>
      </CSSTransitionGroup>
    )
  );
}

export default Quiz;
