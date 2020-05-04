const counter = (state = 0, action) => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return state++;
    case "PREV_QUESTION":
      return state--;
    default:
      return state;
  }
};

export { counter };
