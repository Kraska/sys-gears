import {
  Survey,
  goAroundSurvey,
  SurveySessionResult,
  SurveyPathVariants,
} from "../task4/Survey";

describe("Task4. ", () => {
  test("Survey about marital status", () => {
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

    const res = goAroundSurvey(survey);
    console.dir(res, { depth: null });

    const expectedList = [
      {
        "What is your marital status?": "Married",
        "How long have you been married?": "More than a year",
        "Have you celebrated your one year anniversary?": "No",
      },
      {
        "What is your marital status?": "Married",
        "How long have you been married?": "More than a year",
        "Have you celebrated your one year anniversary?": "Yes",
      },
      {
        "What is your marital status?": "Married",
        "How long have you been married?": "Less than a year",
      },
      {
        "What is your marital status?": "Single",
        "Are you planning on getting married next year?": "No",
      },
      {
        "What is your marital status?": "Single",
        "Are you planning on getting married next year?": "Yes",
      },
    ];

    checkResult(res, expectedList);
  });
});

const checkResult = (
  res: SurveyPathVariants,
  expectedPaths: SurveySessionResult[]
) => {
  const expectedNumber = expectedPaths.length;
  expect(res.paths.list).toEqual(expect.arrayContaining(expectedPaths));
  expect(res.paths.list.length).toBe(expectedNumber);
  expect(res.paths.number).toBe(expectedNumber);
};
