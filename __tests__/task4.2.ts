import { Survey, SurveySettings } from "../task4/app2";

const settings: SurveySettings = {
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

const doSurvey = (pathsToDo: string[][], survey: Survey) => {
  const path = pathsToDo.pop() || [];

  // go through the path
  let next;
  path.forEach((answer) => {
    next = survey.getNext();
    survey.doAnswer(answer);
  });

  next = survey.getNext();
  while (next) {
    const answer = next.answers.pop();
    survey.doAnswer(answer);

    next.answers
      .map((answer) => [...path, answer])
      .forEach((path) => pathsToDo.push(path));

    path.push(answer);
    next = survey.getNext();
  }

  // console.log("pathsToDo", pathsToDo);
  return survey.getResult();
};

describe("Task4. ", () => {
  test("Case1", () => {
    const results = [];
    const pathsToDo = [];

    do {
      const survey = new Survey(settings);
      const res = doSurvey(pathsToDo, survey);
      res && results.push(res);
      // console.log("res", res);
    } while (pathsToDo.length);

    console.log("results", results);
  });
});
