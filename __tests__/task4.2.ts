import { Survey, goAroundSurvey } from "../task4/app2";

const survey: Survey = {
  question: "What is your marital status?",
  answers: {
    Single: {
      question: "Are you planning on getting married next year?",
      answers: {
        Yes: null,
        No: null,
      },
    },
    Married: {
      question: "How long have you been married?",
      answers: {
        "Less than a year": null,
        "More than a year": {
          question: "Have you celebrated your one year anniversary?",
          answers: {
            Yes: null,
            No: null,
          },
        },
      },
    },
  },
};

describe("Task4. ", () => {
  test("Case1", () => {
    const results = goAroundSurvey(survey);
    console.log("results", results);
  });
});
