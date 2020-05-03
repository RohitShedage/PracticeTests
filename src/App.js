import React, { Component } from "react";
import quizQuestions from "./api/quizQuestions";
import { shuffleQuiz } from "./services/shuffleService";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      answer: "",
      result: {
        correct: 0,
        wrong: 0,
        displayResult: false
      },
      questions: []
    };
  }

  componentDidMount() {
    const questions = shuffleQuiz(quizQuestions);
    this.setState({
      questions
    });
  }

  submitTest = () => {
    this.setState({
      result: { ...this.state.result, displayResult: true }
    });
  };

  handleAnswerSelected = event => {
    const answer = event.currentTarget.value;
    const key = answer.includes("wrong") ? "wrong" : "correct";
    this.setState(state => ({
      result: {
        ...state.result,
        [key]: state.result[key] + 1
      },
      answer: answer
    }));
  };

  setNextQuestion = () => {
    const counter = this.state.counter + 1;

    this.setState({
      counter: counter,
      answer: ""
    });
  };

  render() {
    console.log(this.state.questions);
    return (
      this.state.questions.length && (
        <div className="App">
          <div className="App-header">
            <h2>Quiz</h2>
          </div>
          <Quiz
            answer={this.state.answer}
            answerOptions={this.state.questions[this.state.counter].answers}
            questionId={this.state.counter + 1}
            question={this.state.questions[this.state.counter].question}
            questionTotal={this.state.questions.length}
            onAnswerSelected={this.handleAnswerSelected}
            onNextQuestion={this.setNextQuestion}
            onSubmitTest={this.submitTest}
            displayQuiz={!this.state.result.displayResult}
          />
          <Result quizResult={this.state.result} />
        </div>
      )
    );
  }
}

export default App;
