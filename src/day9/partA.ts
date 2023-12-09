import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
const areZeros = (line: number[]) => {
  return line.filter((num) => num === 0).length === line.length;
};
const getNextLine = (line: number[]) => {
  const diffs: number[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    diffs.push(line[i + 1] - line[i]);
  }
  return diffs;
};
export default function partA(): void {
  const input = getInput()
    .split("\n")
    .map((line) => line.split(" ").map((num) => parseInt(num)));
  let runningTotal = 0;
  for (const history of input) {
    let diffs = history;
    const historyOfHistorys: number[][] = [];
    historyOfHistorys.push(diffs);
    while (!areZeros(diffs)) {
      diffs = getNextLine(diffs);
      historyOfHistorys.push(diffs);
    }
    for (let i = historyOfHistorys.length - 2; i >= 0; i--) {
      const lastNumber =
        historyOfHistorys[i + 1][historyOfHistorys[i + 1].length - 1];
      const nextLastNum = historyOfHistorys[i][historyOfHistorys[i].length - 1];
      const newNextNum = lastNumber + nextLastNum;
      historyOfHistorys[i].push(newNextNum);
      if (i === 0) {
        runningTotal += newNextNum;
      }
    }
  }
  console.log(`Part A: ${runningTotal}`);
}
