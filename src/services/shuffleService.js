const mapAnswers = array => {
  return array.map((itr, index) => {
    return {
      ...itr,
      type: !!itr.type ? itr.type : "wrong" + index
    };
  });
};

const shuffleArray = array => {
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
};

const shuffleQuiz = questions => {
  questions = shuffleArray(questions);

  return questions.map(question => {
    return {
      ...question,
      answers: shuffleArray(mapAnswers(question.answers)),
      selectedAnswer: ""
    };
  });
};

const initializeUserData = array => {
  const userDataMap = {};
  array.forEach((element, index) => {
    userDataMap[index] = {
      selectedAnswer: "",
      timeSpent: 0
    };
  });
  return userDataMap;
};

export { shuffleQuiz, initializeUserData };
