/**
 * Tree for describing rules for chosing next question
 */
export type Survey = {
  question: string;
  answers: {
    [answer: string]: Survey | null;
  };
};

/**
 * One person survey result
 */
export type SurveySessionResult = {
  [question: string]: string;
};

/**
 * One person survey
 */
export class SurveySession {
  currentNode: Survey | null;
  result: SurveySessionResult = {};

  constructor(settings: Survey) {
    this.currentNode = settings;
  }

  getNext() {
    if (!this.currentNode) {
      return null;
    }
    return {
      question: this.currentNode.question,
      answers: Object.keys(this.currentNode.answers),
    };
  }

  doAnswer(answer: string) {
    if (
      !Object.keys(this.currentNode.answers).find((item) => item === answer)
    ) {
      throw Error(
        `Invalid answer "${answer}" for question "${this.currentNode.question}". 
        Posible answers: ${this.currentNode.answers}.`
      );
    }
    this.result[this.currentNode.question] = answer;
    this.currentNode = this.currentNode.answers[answer];
  }

  getResult() {
    return this.result;
  }
}

export type SurveyPathVariants = {
  paths: {
    number: number;
    list: SurveySessionResult[];
  };
};

/**
 * Go through the all survey path variants
 * @param survey
 * @returns SurveyPathVariants
 */
export const goAroundSurvey = (survey: Survey): SurveyPathVariants => {
  const results = [];
  const pathsToGo = [];

  do {
    const surveySession = new SurveySession(survey);
    const res = takeSurvay(pathsToGo, surveySession);
    res && results.push(res);
    // console.log("res", res);
  } while (pathsToGo.length);

  return { paths: { number: results.length, list: results } };
};

/**
 * Take a `path` from `pathsToGo` and start `surveySession` with answers from `path`,
 * finish surveySession with any possible answers,
 * from rest answers form the new paths and add to pathsToGo
 * @param pathsToGo
 * @param surveySession
 * @returns SurveySessionResult
 */
const takeSurvay = (
  pathsToGo: string[][],
  surveySession: SurveySession
): SurveySessionResult => {
  const path = pathsToGo.pop() || [];

  let next;
  // start the survey with the path
  path.forEach((answer) => {
    next = surveySession.getNext();
    surveySession.doAnswer(answer);
  });

  // continue the survey with any possible answers
  next = surveySession.getNext();
  while (next) {
    const answer = next.answers.pop();
    surveySession.doAnswer(answer);

    //form paths for next surveyInstanses
    // and add to pathsToGo
    next.answers
      .map((answer) => [...path, answer])
      .forEach((path) => pathsToGo.push(path));

    path.push(answer);
    next = surveySession.getNext();
  }

  return surveySession.getResult();
};
