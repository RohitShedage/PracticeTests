import React, { Component } from "react";
import Quiz from "./Quiz";
import Result from "./Result";
import Timer from "./Timer";

class Home extends Component {
  componentDidMount = () =>
    (this.intervalMethod = setInterval(this.updateTimeMethod, 1000));

  componentWillUnmount = () => clearInterval(this.intervalMethod);

  updateTimeMethod = () => {
    this.props.updateTime(this.props.counter);

    if (this.props.remainingTime === 0 || this.props.result.displayResult) {
      clearInterval(this.intervalMethod);
      this.props.submitTest(this.props.userData);
    }
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
            onSubmitTest={() => this.props.submitTest(this.props.userData)}
            displayQuiz={!this.props.result.displayResult}
            timeSpent={this.props.userData[this.props.counter].timeSpent}
          />
          <Result quizResult={this.props.result} />
        </div>
      )
    );
  }
}

export default Home;
