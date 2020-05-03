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
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {
        correct: 0,
        wrong: 0
      },
      result: "",
      questions: []
    };
  }

  componentDidMount() {
    const questions = shuffleQuiz(quizQuestions);
    this.setState({
      questions,
      question: questions[0].question,
      answerOptions: questions[0].answers
    });
  }

  submitTest = () => {
    this.setState({
      result: { ...this.state.answersCount, total: this.state.questions.length }
    });
  };

  handleAnswerSelected = event => {
    const answer = event.currentTarget.value;
    const key = answer.includes("wrong") ? "wrong" : "correct";
    this.setState(state => ({
      answersCount: {
        ...state.answersCount,
        [key]: state.answersCount[key] + 1
      },
      answer: answer
    }));
  };

  setNextQuestion = () => {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.questions[counter].question,
      answerOptions: this.state.questions[counter].answers,
      answer: ""
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Quiz</h2>
        </div>
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={this.state.questions.length}
          onAnswerSelected={this.handleAnswerSelected}
          onNextQuestion={this.setNextQuestion}
          onSubmitTest={this.submitTest}
          displayQuiz={!this.state.result}
        />
        <Result quizResult={this.state.result} />
      </div>
    );
  }
}

export default App;
