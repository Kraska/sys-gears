import { toJson } from "really-relaxed-json";

export class ProcessArgv<INPUT> {
  private n: number;
  private title: string;
  private example: string;

  constructor(n: number, title: string, example: string | null = null) {
    this.n = n;
    this.title = title;
    this.example = example;
  }

  getArgv(): string {
    if (!process.argv[this.n]) {
      let msg = `ERROR! You need specify the '${this.title}' as process argv when run app!\n`;
      msg = this.example ? msg + ` For example: '${this.example}'` : msg;
      throw Error(msg);
    }
    return process.argv[this.n];
  }

  getJson(): INPUT {
    return JSON.parse(toJson(this.getArgv()));
  }

  getFileContent(): string {
    const fs = require("fs");
    return fs.readFileSync(this.getArgv());
  }

  getJsonFromFile(): INPUT {
    return JSON.parse(this.getFileContent());
  }
}
