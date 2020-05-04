import { quizQuestions } from "../api/quizQuestions";

const defaultResult = {
  correct: 0,
  total: quizQuestions.length,
  displayResult: false
};

const result = (state = defaultResult, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { result };
