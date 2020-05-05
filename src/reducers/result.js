import { quizQuestions } from "../api/quizQuestions";

const defaultResult = {
  correct: 0,
  total: quizQuestions.length,
  displayResult: false
};

const result = (state = defaultResult, action) => {
  switch (action.type) {
    case "SUBMIT_TEST":
      return {
        ...state,
        ...action.payload,
        displayResult: true
      };
    default:
      return state;
  }
};

export { result };
