export type SurveySettings = {
  question: string;
  answers: {
    [answer: string]: SurveySettings | null;
  };
};

export type SurveyResult = {
  [question: string]: string;
};

export class Survey {
  currentItem: SurveySettings | null;
  result: SurveyResult = {};

  constructor(settings: SurveySettings) {
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
        `Wrong answer "${answer}" for question "${this.currentItem.question}"`
      );
    }
    this.result[this.currentItem.question] = answer;
    this.currentItem = this.currentItem.answers[answer];
  }

  getResult() {
    return this.result;
  }
}
