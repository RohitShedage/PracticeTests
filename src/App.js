import React, { Component } from "react";
import { quizQuestions, allotedTimeInSeconds } from "./api/quizQuestions";
import { shuffleQuiz, initializeUserData } from "./services/shuffleService";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Timer from "./components/Timer";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      result: {
        displayResult: false
      },
      questions: [],
      userData: {},
      remainingTime: 100
    };
  }

  componentDidMount() {
    const questions = shuffleQuiz(quizQuestions);
    const userData = initializeUserData(questions);
    this.setState({
      questions,
      userData,
      remainingTime: allotedTimeInSeconds
    });
    this.intervalMethod = setInterval(this.updateTime, 1000);
  }

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

  handleAnswerSelected = event => {
    const answer = event.currentTarget.value;
    this.setState({
      userData: {
        ...this.state.userData,
        [this.state.counter]: {
          ...this.state.userData[this.state.counter],
          selectedAnswer: answer
        }
      }
    });
  };

  setNextQuestion = () => this.setState({ counter: this.state.counter + 1 });

  setPrevQuestion = () => this.setState({ counter: this.state.counter - 1 });

  render() {
    return (
      this.state.questions.length && (
        <div className="App">
          <div className="App-header">
            <h2>
              Quiz - Time Remaining
              <Timer format="HHMMSS" timeInSeconds={this.state.remainingTime} />
            </h2>
          </div>
          <Quiz
            answer={this.state.userData[this.state.counter].selectedAnswer}
            answerOptions={this.state.questions[this.state.counter].answers}
            questionId={this.state.counter + 1}
            question={this.state.questions[this.state.counter].question}
            questionTotal={this.state.questions.length}
            onAnswerSelected={this.handleAnswerSelected}
            onNextQuestion={this.setNextQuestion}
            onPreviousQuestion={this.setPrevQuestion}
            onSubmitTest={this.submitTest}
            displayQuiz={!this.state.result.displayResult}
            timeSpent={this.state.userData[this.state.counter].timeSpent}
          />
          <Result quizResult={this.state.result} />
        </div>
      )
    );
  }
}

export default App;
