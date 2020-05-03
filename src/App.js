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
      result: {
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
      result: {
        correct: this.state.questions.filter(
          question => question.selectedAnswer === "correct"
        ).length,
        total: this.state.questions.length,
        displayResult: true
      }
    });
  };

  handleAnswerSelected = event => {
    const answer = event.currentTarget.value;
    this.setState(state => ({
      questions: this.state.questions.map((question, index) => {
        return index === this.state.counter
          ? { ...question, selectedAnswer: answer }
          : question;
      })
    }));
  };

  setNextQuestion = () => this.setState({ counter: this.state.counter + 1 });

  setPrevQuestion = () => this.setState({ counter: this.state.counter - 1 });

  render() {
    console.log(this.state.questions);
    return (
      this.state.questions.length && (
        <div className="App">
          <div className="App-header">
            <h2>Quiz</h2>
          </div>
          <Quiz
            answer={this.state.questions[this.state.counter].selectedAnswer}
            answerOptions={this.state.questions[this.state.counter].answers}
            questionId={this.state.counter + 1}
            question={this.state.questions[this.state.counter].question}
            questionTotal={this.state.questions.length}
            onAnswerSelected={this.handleAnswerSelected}
            onNextQuestion={this.setNextQuestion}
            onPreviousQuestion={this.setPrevQuestion}
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
