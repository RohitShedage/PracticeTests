import { allotedTimeInSeconds } from "../api/quizQuestions";

const remainingTime = (state = allotedTimeInSeconds, action) => {
  switch (action.type) {
    case "UPDATE_TIME":
      return state--;
    default:
      return state;
  }
};

export { remainingTime };
