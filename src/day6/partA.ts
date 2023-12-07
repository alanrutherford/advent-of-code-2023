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
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num))
    );
  let totalScore = 1;
  for (let i = 0; i < input[0].length; i++) {
    let timesBeatenDistance = 0;
    for (let j = 0; j < input[0][i]; j++) {
      const charge = j;
      const speed = input[0][i] - charge;
      const distance = charge * speed;
      if (distance > input[1][i]) {
        timesBeatenDistance++;
      }
    }
    totalScore *= timesBeatenDistance;
  }
  console.log(`Part A: ${totalScore}`);
}
