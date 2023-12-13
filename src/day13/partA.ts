import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput()
    .split("\n\n")
    .map((pattern) => pattern.split("\n"));
  let score = 0;
  const isColumnReflection = (puzzle: string[], columnNumber: number) => {
    for (
      let i = 0;
      columnNumber + 1 + i < puzzle[0].length && columnNumber - i >= 0;
      i++
    ) {
      const column1 = puzzle.map((line) => line[columnNumber - i]).join("");
      const column2 = puzzle.map((line) => line[columnNumber + i + 1]).join("");
      if (column1 !== column2) {
        return false;
      }
    }
    return true;
  };
  const isRowReflection = (puzzle: string[], rowNumber: number) => {
    for (
      let i = 0;
      rowNumber + 1 + i < puzzle.length && rowNumber - i >= 0;
      i++
    ) {
      if (puzzle[rowNumber - i] !== puzzle[rowNumber + 1 + i]) {
        return false;
      }
    }
    return true;
  };
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length - 1; j++) {
      if (input[i][j] === input[i][j + 1]) {
        if (isRowReflection(input[i], j)) {
          score += 100 * (j + 1);
        }
      }
    }
    for (let j = 0; j < input[i][0].length; j++) {
      const column1 = input[i].map((line) => line[j]).join("");
      const column2 = input[i].map((line) => line[j + 1]).join("");
      if (column1 === column2) {
        if (isColumnReflection(input[i], j)) {
          score += j + 1;
        }
      }
    }
  }
  console.log(`Part A: ${score}`);
}
