import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
const spelledNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const checkSpelledNumbers = (restOfLine: string) => {
  const spelledNumbersCheck = spelledNumbers.map((spelledNumber) => {
    if (spelledNumber.length > restOfLine.length) {
      return false;
    } else if (
      spelledNumber === restOfLine.substring(0, spelledNumber.length)
    ) {
      return true;
    } else return false;
  });

  return spelledNumbersCheck.findIndex((elem) => elem) < 0
    ? false
    : spelledNumbersCheck.findIndex((elem) => elem) + 1;
};
const getNumPositions = (line: string) => {
  const positions: number[] = [];
  for (let i = 0; i < line.length; i++) {
    if (line[i] >= "0" && line[i] <= "9") {
      positions.push(parseInt(line[i]));
    } else {
      const spelledNumberCheck = checkSpelledNumbers(line.substring(i));
      if (spelledNumberCheck) {
        positions.push(spelledNumberCheck);
      }
    }
  }
  return positions;
};
export default function partB(): void {
  const input = getInput().split("\n");
  const firtAndLast = input
    .map((line) => getNumPositions(line))
    .map((parsedNumbers) =>
      parseInt(`${parsedNumbers[0]}${parsedNumbers[parsedNumbers.length - 1]}`)
    )
    .reduce((a, b) => a + b);
  console.log(`Part B: ${firtAndLast}`);
}
