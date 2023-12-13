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
    console.log(columnNumber);
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
    console.log(`${i}: ---`);
    for (let j = 0; j < input[i].length - 1; j++) {
      if (input[i][j] === input[i][j + 1]) {
        if (isRowReflection(input[i], j)) {
          console.log(`${i} rowReflection ${j}`);
          score += 100 * (j + 1);
        }
      }
    }
    for (let j = 0; j < input[i][0].length; j++) {
      const column1 = input[i].map((line) => line[j]).join("");
      const column2 = input[i].map((line) => line[j + 1]).join("");

      if (column1 === column2) {
        if (isColumnReflection(input[i], j)) {
          console.log(`${i} columnReflection ${j}`);
          console.log(column1);
          score += j + 1;
        }
        //check if proper rflection
        //column add
      }
      // if (checkIfClearOfGalaxy(column)) {
      //   for (let j = 0; j < input.length; j++) {
      //     input[j].splice(i, 0, ".");
      //   }
      //   i++;
      // }
    }
  }
  console.log(`Part A: ${score} ${score !== 33744}`);
}
