import { quizQuestions } from "../api/quizQuestions";
import { initializeUserData } from "../services/shuffleService";

const userData = (state = initializeUserData(quizQuestions), action) => {
  switch (action.type) {
    case "ANSWER_SUBMITTED":
      return {
        ...state,
        [action.payload.counter]: {
          ...state[action.payload.counter],
          selectedAnswer: action.payload.answer
        }
      };

    default:
      return state;
  }
};

export { userData };
