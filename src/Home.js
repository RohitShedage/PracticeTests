import React, { Component } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Timer from "./components/Timer";
import "./App.css";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount = () =>
    (this.intervalMethod = setInterval(this.props.updateTime, 1000));

  componentWillUnmount = () => clearInterval(this.intervalMethod);

  updateTime = () => {
    this.setState({
      remainingTime: this.state.remainingTime - 1,
      userData: {
        ...this.state.userData,
        [this.state.counter]: {
          ...this.state.userData[this.state.counter],
          timeSpent: this.state.userData[this.state.counter].timeSpent + 1
        }
      }
    });

    if (this.state.remainingTime === 0) {
      clearInterval(this.intervalMethod);
      this.submitTest();
    }
  };

  submitTest = () => {
    this.setState({
      result: {
        correct: Object.entries(this.state.userData).filter(
          entry => entry[1].selectedAnswer === "correct"
        ).length,
        total: this.state.questions.length,
        displayResult: true
      }
    });
  };

  render() {
    return (
      this.props.questions.length && (
        <div className="App">
          <div className="App-header">
            <h2>Quiz</h2>
            <div>
              Time Remaining in (HH:MM:SS) -{" "}
              <Timer format="HHMMSS" timeInSeconds={this.props.remainingTime} />
            </div>
          </div>
          <Quiz
            answer={this.props.userData[this.props.counter].selectedAnswer}
            answerOptions={this.props.questions[this.props.counter].answers}
            questionId={this.props.counter + 1}
            question={this.props.questions[this.props.counter].question}
            questionTotal={this.props.questions.length}
            onAnswerSelected={event =>
              this.props.handleAnswerSelected(event, this.props.counter)
            }
            onNextQuestion={this.props.setNextQuestion}
            onPreviousQuestion={this.props.setPrevQuestion}
            onSubmitTest={this.props.submitTest}
            displayQuiz={!this.props.result.displayResult}
            timeSpent={this.props.userData[this.props.counter].timeSpent}
          />
          <Result quizResult={this.props.result} />
        </div>
      )
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setNextQuestion: () => dispatch({ type: "NEXT_QUESTION" }),
    setPrevQuestion: () => dispatch({ type: "PREV_QUESTION" }),
    updateTime: () => dispatch({ type: "UPDATE_TIME" }),
    handleAnswerSelected: (event, counter) =>
      dispatch({
        type: "ANSWER_SUBMITTED",
        payload: {
          answer: event.currentTarget.value,
          counter
        }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
