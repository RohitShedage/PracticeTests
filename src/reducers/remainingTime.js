import { allotedTimeInSeconds } from "../api/quizQuestions";

const remainingTime = (state = allotedTimeInSeconds, action) => {
  switch (action.type) {
    case "UPDATE_TIME":
      return state - 1;
    case "SUBMIT_TEST":
      return 0;
    default:
      return state;
  }
};

export { remainingTime };
