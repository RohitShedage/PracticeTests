import React, { Component } from "react";
import quizQuestions from "./api/quizQuestions";
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

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.submitTest = this.submitTest.bind(this);
  }

  componentDidMount() {
    const questions = this.shuffleArray(quizQuestions);
    this.setState({
      questions,
      question: questions[0].question,
      answerOptions: this.shuffleArray(this.mapAnswers(questions[0].answers))
    });
  }

  mapAnswers(array) {
    return array.map((itr, index) => {
      return {
        ...itr,
        type: !!itr.type ? itr.type : "wrong" + index
      };
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
  }

  submitTest() {
    this.setResults(this.getResults());
  }

  setUserAnswer(answer) {
    const key = answer.includes("wrong") ? "wrong" : "correct";
    this.setState(state => ({
      answersCount: {
        ...state.answersCount,
        [key]: state.answersCount[key] + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.questions[counter].question,
      answerOptions: this.shuffleArray(
        this.mapAnswers(this.state.questions[counter].answers)
      ),
      answer: ""
    });
  }

  getResults() {
    return { ...this.state.answersCount, total: this.state.questions.length };
  }

  setResults(result) {
    this.setState({ result });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.questions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onNextQuestion={this.setNextQuestion}
        onSubmitTest={this.submitTest}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
