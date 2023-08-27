import { Survey, SurveySettings } from "../task4/app";

// const QuestionIds = [1,2,3,4] as const;
type QuestionId = 1 | 2 | 3 | 4;

const settings: SurveySettings<QuestionId> = {
  1: {
    question: "What is your marital status?",
    answers: {
      1: "Single",
      2: "Married",
    },
    nextQuestionsMap: {
      1: 2,
      2: 3,
    },
  },
  2: {
    question: "Are you planning on getting married next year?",
    answers: {
      1: "Yes",
      2: "No",
    },
    nextQuestionsMap: {
      1: null,
      2: null,
    },
  },
  3: {
    question: "How long have you been married?",
    answers: {
      1: "Less than a year",
      2: "More than a year",
    },
    nextQuestionsMap: {
      1: null,
      2: 4,
    },
  },
  4: {
    question: "Have you celebrated your one year anniversary?",
    answers: {
      1: "Yes",
      2: "No",
    },
    nextQuestionsMap: {
      1: null,
      2: null,
    },
  },
};

describe("Task4. ", () => {
  test("Case1", () => {
    //testCase(settings);

    const survey = new Survey(settings);
    let question;
    do {
      let question = survey.getNext();
      console.log(question.question, question.answers);

      Object.keys(question.answers)
        .map((answerId) => parseInt(answerId))
        .forEach((answerId) => surveyContinue(survey, answerId));
    } while (question);

    const result = survey.getResult();
    console.log("result = ", result);
  });
});

const surveyContinue = <QID extends number>(
  survey: Survey<QID>,
  answerId: number
) => {
  survey.doAnswer(answerId);
  let question = survey.getNext();
};

const testCase = <QID extends number>(settings: SurveySettings<QID>) => {
  const survey = new Survey(settings);

  let question;
  do {
    let question = survey.getNext();
    console.log(question.question, question.answers);
    survey.doAnswer(2);
  } while (question);

  const result = survey.getResult();
  console.log("result = ", result);
};
