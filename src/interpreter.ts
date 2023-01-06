import fs from "fs";

const addtion = (a: number, b: number) => a + b;
const subtraction = (a: number, b: number) => a - b;
const multiplication = (a: number, b: number) => a * b;
const division = (a: number, b: number) => a / b;

class Interpreter {
  static settingJSON: any;
  values: Map<number, number>;
  constructor() {
    this.values = new Map();
  }
  static {
    Interpreter.settingJSON = JSON.parse(
      fs.readFileSync("./src/setting.json").toString()
    );
  }
  // splitLine(line: string): Array<string> {
  //   return line.match(/[^\s"]+|"([^"]*)"/gim) as Array<string>;
  // }
  getArguments(line: string): Array<number> {
    const commandArguments: Array<number> = new Array();
    let openedArguments: number = 0;
    let startedArgument: number = -1;

    for (let i = 0; i < line.length; i++) {
      if (line.charAt(i) == "(") {
        openedArguments++;
        if (startedArgument == -1) startedArgument = i;
      } else if (line.charAt(i) == ")") {
        openedArguments--;

        if (openedArguments == 0) {
          const argument: string = line.slice(startedArgument + 1, i);

          if (!isNaN(Number(argument))) {
            commandArguments.push(Number(argument));
          } else {
            commandArguments.push(this.interpretLine(argument));
          }
          startedArgument = -1;
        }
      }
    }
    return commandArguments;
  }
  set(valueID: number, value: number): number {
    this.values.set(valueID, value);
    return value;
  }
  get(valueID: number): number {
    if (!this.values.has(valueID)) {
      console.log("존재하지 않는 변수 ID입니다.");
      return -1;
    }
    const value = this.values.get(valueID) as number;
    return value;
  }
  increase(valueID: number) {
    if (!this.values.has(valueID)) {
      console.log("존재하지 않는 변수 ID입니다.");
      return -1;
    }
    const value = this.values.get(valueID) as number;

    this.values.set(valueID, value + 1);
    return value + 1;
  }
  decrease(valueID: number) {
    if (!this.values.has(valueID)) {
      console.log("존재하지 않는 변수 ID입니다.");
      return -1;
    }
    const value = this.values.get(valueID) as number;

    this.values.set(valueID, value - 1);
    return value - 1;
  }
  getCommandName(line: string): string {
    for (let i = 0; i < line.length; i++) {
      if (line.at(i) == " " || line.at(i) == "(") {
        return line.slice(0, i);
      }
    }
    return line;
  }
  init() {
    this.values = new Map();
  }
  interpretLine(line: string): number {
    const commandName = this.getCommandName(line);
    const commandArguments = this.getArguments(line);

    const realCommand = Interpreter.settingJSON[commandName];
    if (realCommand == undefined) {
      console.log(`${commandName} 명령을 찾을 수 없습니다.`);
      return -1;
    } else {
      return eval(`${realCommand}(${commandArguments.toString()})`);
    }
  }
}

export default Interpreter;
