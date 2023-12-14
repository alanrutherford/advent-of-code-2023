import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
const flip = (item: string) => {
  return item === "#" ? "." : "#";
};
const input = getInput()
  .split("\n\n")
  .map((pattern) => pattern.split("\n"));
let score = 0;
let originalScore = 0;
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
const rowReflection = (puzzle: string[], cantEqual: number = 0) => {
  for (let j = 0; j < puzzle.length - 1; j++) {
    if (puzzle[j] === puzzle[j + 1]) {
      if (isRowReflection(puzzle, j) && j >= 0 && j !== cantEqual - 1) {
        //score += 100 * (j + 1);
        return j + 1;
      }
    }
  }
  return 0;
};
const columnReflection = (puzzle: string[], cantEqual: number = 0) => {
  for (let j = 0; j < puzzle[0].length; j++) {
    const column1 = puzzle.map((line) => line[j]).join("");
    const column2 = puzzle.map((line) => line[j + 1]).join("");

    if (column1 === column2 && j >= 0 && j !== cantEqual - 1) {
      if (isColumnReflection(puzzle, j)) {
        return j + 1;
      }
    }
  }
  return 0;
};
const checkAllFlips = (
  puzzle: string[],
  originalColumn: number,
  originalRow: number
) => {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      let copy = JSON.parse(JSON.stringify(puzzle)).map((line: string) =>
        line.split("")
      ) as string[][];
      copy[i][j] = flip(copy[i][j]);
      const copycopy = copy.map((line) => line.join(""));
      const row = rowReflection(copycopy, originalRow);
      if (row > 0 && row != originalRow) {
        score += 100 * row;
        return;
      }

      const column = columnReflection(copycopy, originalColumn);
      if (column > 0 && column !== originalColumn) {
        score += column;
        return;
      }
    }
  }
};
for (let i = 0; i < input.length; i++) {
  const originalRow = rowReflection(input[i]);
  const originalColumn = columnReflection(input[i]);
  originalScore += originalColumn;
  originalScore += 100 * originalRow;
  checkAllFlips(input[i], originalColumn, originalRow);
}
console.log(`Part A: ${originalScore} `);

console.log(`Part B: ${score}`);
