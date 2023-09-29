import { ProcessArgv } from "../helpers";
import { goAroundSurvey, Survey } from "./Survey";

try {
  const processArgv = new ProcessArgv(
    2,
    "path to survey.json",
    "./task4/survey1.json"
  );
  const json = processArgv.getJsonFromFile();

  const survey = json as Survey;
  // console.dir(survey, { depth: null });

  const res = goAroundSurvey(survey);
  console.dir(res, { depth: null });
} catch (e) {
  console.error((e as Error).message);
}
