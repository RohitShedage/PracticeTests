const counter = (state = 0, action) => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return state + 1;
    case "PREV_QUESTION":
      return state - 1;
    case "GO_TO_QUESTION":
      return action.payload;
    default:
      return state;
  }
};

export { counter };
