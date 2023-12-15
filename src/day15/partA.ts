import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput().split(",");
  let totalValue = 0;
  for (const step of input) {
    let currentValue = 0;
    for (let i = 0; i < step.length; i++) {
      currentValue += step.charCodeAt(i);
      currentValue *= 17;
      currentValue = currentValue % 256;
    }

    totalValue += currentValue;
  }
  console.log(`Part A: ${totalValue}`);
}
