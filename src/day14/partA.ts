import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput().split("\n");
  let tilted: string[] = Array(input.length).join(".").split(".");
  for (let j = 0; j < input[0].length; j++) {
    const column1 = input.map((line) => line[j]).join("");
    const splitColumn = column1.split("#");
    const sorted = splitColumn
      .map((freeSpace) =>
        freeSpace.split("").sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
      )
      .map((line) => line.join(""))
      .join("#");
    for (let i = 0; i < sorted.length; i++) {
      tilted[i] = tilted[i].concat(sorted[i]);
    }
  }
  let load = 0;
  for (let i = 0; i < tilted.length; i++) {
    for (let j = 0; j < tilted[i].length; j++) {
      if (tilted[i][j] === "O") {
        load += tilted.length - i;
      }
    }
  }
  console.log(`Part A: ${load}`);
}
