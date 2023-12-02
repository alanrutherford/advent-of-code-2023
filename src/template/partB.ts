import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partB(): void {
  const input = getInput();

  console.log(`Part B:`);
}
