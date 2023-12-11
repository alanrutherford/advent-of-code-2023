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
export default function partA(): void {
  const galaxyLocations: Point[] = [];
  let distance = 0;
  let input = getInput()
    .split("\n")
    .map((line) => line.split(""));
  for (let i = 0; i < input.length; i++) {
    if (checkIfClearOfGalaxy(input[i])) {
      const newLine: string[] = new Array(input[i].length).fill(".");
      input.splice(i, 0, newLine);
      i++;
    }
  }
  for (let i = 0; i < input[0].length; i++) {
    const column = input.map((line) => line[i]);
    if (checkIfClearOfGalaxy(column)) {
      for (let j = 0; j < input.length; j++) {
        input[j].splice(i, 0, ".");
      }
      i++;
    }
  }
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "#") {
        galaxyLocations.push({ x: j, y: i });
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

  console.log(`Part A: ${distance}`);
}
