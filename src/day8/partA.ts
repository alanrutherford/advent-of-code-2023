import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput().split("\n\n");
  interface Node {
    [key: string]: { left: string; right: string };
  }
  let desertMap: Node = {};

  const instructions = input[0].split("");
  input[1].split("\n").forEach((line) => {
    const lineArr = line.split(" = ");
    const [left, right] = lineArr[1]
      .replace("(", "")
      .replace(")", "")
      .split(", ");
    desertMap[lineArr[0].trim()] = { left, right };
  });
  let currentNode = "AAA";
  const endNode = "ZZZ";
  let counter = 0;
  while (currentNode !== endNode) {
    currentNode =
      instructions[counter % instructions.length] === "L"
        ? desertMap[currentNode].left
        : desertMap[currentNode].right;
    counter++;
  }
  console.log(`Part A: ${counter}`);
}
