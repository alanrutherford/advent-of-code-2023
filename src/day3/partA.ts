import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
const isNumber = (char: string) => {
  if (char >= "0" && char <= "9") {
    return true;
  }
  return false;
};
const isSymbol = (char: string) => {
  if (isNumber(char)) {
    return false;
  }
  if (char === ".") {
    return false;
  }
  // if not . or 0->9, then it must be a special symbol
  return true;
};
const getFullNumber = (grid: string[][], row: number, column: number) => {
  let leftMost: number = column;
  let rightMost: number = column;
  let foundLeftMost = false;
  let foundRightMost = false;
  while (!foundLeftMost) {
    leftMost--;
    if (!isNumber(grid[row][leftMost])) {
      leftMost++;
      foundLeftMost = true;
    }
  }
  while (!foundRightMost) {
    rightMost++;
    if (!isNumber(grid[row][rightMost])) {
      foundRightMost = true;
    }
  }
  return parseInt(grid[row].join("").substring(leftMost, rightMost));
};
const getAdjacentValues = (grid: string[][], row: number, column: number) => {
  const adjacentNumbers: number[] = [];
  for (let i = -1; i < 2; i++) {
    const inLineAdjacentNumbers: number[] = [];
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      if (isNumber(grid[row + i][column + j])) {
        const adjacentNumber = getFullNumber(grid, row + i, column + j);
        if (!inLineAdjacentNumbers.includes(adjacentNumber))
          inLineAdjacentNumbers.push(adjacentNumber);
      }
    }
    adjacentNumbers.push(...inLineAdjacentNumbers);
  }
  return adjacentNumbers;
};
export default function partA(): void {
  const schematicGrid = getInput()
    .split("\n")
    .map((line) => line.split(""));
  let sum = 0;
  for (let i = 0; i < schematicGrid.length; i++) {
    for (let j = 0; j < schematicGrid[i].length; j++) {
      if (isSymbol(schematicGrid[i][j])) {
        const adjacentValues = getAdjacentValues(schematicGrid, i, j);
        adjacentValues.forEach((value) => (sum += value));
      }
    }
  }
  console.log(`Part A: ${sum}`);
}
