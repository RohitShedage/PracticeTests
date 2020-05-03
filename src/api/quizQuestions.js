const quizQuestions = [
  {
    question: "18 X 19 = ",
    answers: [
      {
        type: "correct",
        content: "342"
      },
      {
        content: "432"
      },
      {
        content: "162"
      }
    ]
  },
  {
    question: "456 + 767",
    answers: [
      {
        type: "correct",
        content: "1223"
      },
      {
        content: "1213"
      },
      {
        content: "1123"
      }
    ]
  },
  {
    question: "46 + 77",
    answers: [
      {
        type: "correct",
        content: "123"
      },
      {
        content: "113"
      },
      {
        content: "13"
      }
    ]
  }
];

const allotedTimeInSeconds = 90;

export { quizQuestions, allotedTimeInSeconds };
