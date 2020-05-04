import { quizQuestions } from "../api/quizQuestions";
import { shuffleQuiz } from "../services/shuffleService";

const questions = (state = shuffleQuiz(quizQuestions), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { questions };
