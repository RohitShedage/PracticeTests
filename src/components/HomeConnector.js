import Home from "./Home";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setNextQuestion: () => dispatch({ type: "NEXT_QUESTION" }),
    setPrevQuestion: () => dispatch({ type: "PREV_QUESTION" }),
    updateTime: counter =>
      dispatch({ type: "UPDATE_TIME", payload: { counter } }),
    submitTest: userData =>
      dispatch({
        type: "SUBMIT_TEST",
        payload: {
          correct: Object.entries(userData).filter(
            entry => entry[1].selectedAnswer === "correct"
          ).length,
          total: Object.keys(userData).length
        }
      }),
    handleAnswerSelected: (event, counter) =>
      dispatch({
        type: "ANSWER_SUBMITTED",
        payload: {
          answer: event.currentTarget.value,
          counter
        }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
