import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput()
    .split("\n")
    .map((line) =>
      line
        .split(":")[1]
        .split(" ")
        .map((num) => num.trim())
        .join("")
    );
  let timesBeatenDistance = 0;
  for (let j = 0; j < parseInt(input[0]); j++) {
    if (j * (parseInt(input[0]) - j) > parseInt(input[1])) {
      timesBeatenDistance++;
    }
  }
  console.log(`Part B: ${timesBeatenDistance}`);
}
