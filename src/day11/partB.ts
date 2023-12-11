import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
const checkIfClearOfGalaxy = (line: string[]) => {
  return !line.includes("#");
};
type Point = {
  x: number;
  y: number;
};
export default function partB(): void {
  const galaxyLocations: Point[] = [];
  const factor = 1000000 - 1;
  let rowGaps: number[] = [];
  let columnGaps: number[] = [];
  let distance = 0;
  let input = getInput()
    .split("\n")
    .map((line) => line.split(""));
  for (let i = 0; i < input.length; i++) {
    if (checkIfClearOfGalaxy(input[i])) {
      rowGaps.push(i);
    }
  }
  for (let i = 0; i < input[0].length; i++) {
    const column = input.map((line) => line[i]);
    if (checkIfClearOfGalaxy(column)) {
      columnGaps.push(i);
    }
  }
  let cumulativeRows = 0;

  for (let i = 0; i < input.length; i++) {
    if (rowGaps.includes(i)) {
      cumulativeRows += factor;
    }
    let cumulativeColumns = 0;
    for (let j = 0; j < input[i].length; j++) {
      if (columnGaps.includes(j)) {
        cumulativeColumns += factor;
      }
      if (input[i][j] === "#") {
        galaxyLocations.push({
          x: j + cumulativeColumns,
          y: i + cumulativeRows,
        });
      }
    }
  }
  for (let i = 0; i < galaxyLocations.length; i++) {
    for (let j = i; j < galaxyLocations.length; j++) {
      distance +=
        Math.abs(galaxyLocations[i].x - galaxyLocations[j].x) +
        Math.abs(galaxyLocations[i].y - galaxyLocations[j].y);
    }
  }

  console.log(`Part B: ${distance} `);
}
