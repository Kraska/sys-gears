export type Survey = {
  question: string;
  answers: {
    [answer: string]: Survey | null;
  };
};

export type SurveyInstanceResult = {
  [question: string]: string;
};

export type SurveyPathVariants = {
  paths: {
    number: number;
    list: SurveyInstanceResult[];
  };
};

export class SurveyInstance {
  currentItem: Survey | null;
  result: SurveyInstanceResult = {};

  constructor(settings: Survey) {
    this.currentItem = settings;
  }

  getNext() {
    if (!this.currentItem) {
      return null;
    }
    return {
      question: this.currentItem.question,
      answers: Object.keys(this.currentItem.answers),
    };
  }

  doAnswer(answer: string) {
    if (
      !Object.keys(this.currentItem.answers).find((item) => item === answer)
    ) {
      throw Error(
        `Invalid answer "${answer}" for question "${this.currentItem.question}". 
        Posible answers: ${this.currentItem.answers}.`
      );
    }
    this.result[this.currentItem.question] = answer;
    this.currentItem = this.currentItem.answers[answer];
  }

  getResult() {
    return this.result;
  }
}

/**
 * Go through the all survey path variants
 * @param survey
 * @returns SurveyPathVariants
 */
export const goAroundSurvey = (survey: Survey): SurveyPathVariants => {
  const results = [];
  const pathsToGo = [];

  do {
    const surveyInstance = new SurveyInstance(survey);
    const res = takeSurvay(pathsToGo, surveyInstance);
    res && results.push(res);
    // console.log("res", res);
  } while (pathsToGo.length);

  return { paths: { number: results.length, list: results } };
};

/**
 * Take a `path` from `pathsToGo` and start `surveyInstance` with answers from `path`,
 * finish surveyInstance with any possible answers,
 * from rest answers form the new paths and add to pathsToGo
 * @param pathsToGo
 * @param surveyInstance
 * @returns SurveyInstanceResult
 */
const takeSurvay = (
  pathsToGo: string[][],
  surveyInstance: SurveyInstance
): SurveyInstanceResult => {
  const path = pathsToGo.pop() || [];

  // go through the path
  let next;
  path.forEach((answer) => {
    next = surveyInstance.getNext();
    surveyInstance.doAnswer(answer);
  });

  next = surveyInstance.getNext();
  while (next) {
    const answer = next.answers.pop();
    surveyInstance.doAnswer(answer);

    //form paths for next surveyInstanses and add to pathsToGo
    next.answers
      .map((answer) => [...path, answer])
      .forEach((path) => pathsToGo.push(path));

    path.push(answer);
    next = surveyInstance.getNext();
  }

  // console.log("pathsToDo", pathsToDo);
  return surveyInstance.getResult();
};
