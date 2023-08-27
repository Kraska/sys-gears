export type SurveySettingsItem<QID extends number> = {
  question: string;
  answers: {
    [answerId: number]: string;
  };
  nextQuestionsMap: {
    [answerId: number]: QID | null;
  };
};

export type SurveySettings<QID extends number> = {
  [id in QID]: SurveySettingsItem<QID>;
};

export type SurveyResult = {
  question: string;
  answer: string;
}[];

export class Survey<QID extends number> {
  settings: SurveySettings<QID>;
  currentItem: SurveySettingsItem<QID> | null;
  result: SurveyResult = [];

  constructor(settings: SurveySettings<QID>) {
    this.settings = settings;
    this.currentItem = settings[1]; // todo
  }

  getNext() {
    if (!this.currentItem) {
      return null;
    }
    return {
      question: this.currentItem.question,
      answers: this.currentItem.answers,
    };
  }

  doAnswer(answerId: number) {
    const nextQuestionId = this.currentItem.nextQuestionsMap[answerId];
    this.result.push({
      question: this.currentItem.question,
      answer: this.currentItem.answers[answerId], // todo check
    });
    if (nextQuestionId) {
      this.currentItem = this.settings[nextQuestionId];
    } else {
      this.currentItem = null;
    }
  }

  getResult(): SurveyResult {
    return this.result;
  }
}
