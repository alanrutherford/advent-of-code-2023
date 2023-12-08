import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

const getPrimeFactors = (numberToFactorise: number) => {
  const primeFactors: number[] = [];
  let divisor = 2;
  while (numberToFactorise >= 2) {
    if (numberToFactorise % divisor == 0) {
      primeFactors.push(divisor);
      numberToFactorise = numberToFactorise / divisor;
    } else {
      divisor++;
    }
  }
  return primeFactors;
};

const startNodes = (nodes: string[]) => {
  return nodes.filter((node) => node.split("")[2] === "A");
};

export default function partB(): void {
  const input = getInput().split("\n\n");
  interface Node {
    [key: string]: { left: string; right: string };
  }
  let desertMap: Node = {};

  const instructions = input[0].split("");
  const listOfNodes = input[1].split("\n").map((line) => {
    const lineArr = line.split(" = ");
    const [left, right] = lineArr[1]
      .replace("(", "")
      .replace(")", "")
      .split(", ");
    desertMap[lineArr[0].trim()] = { left, right };
    return lineArr[0].trim();
  });
  let currentNodes: string[] = startNodes(listOfNodes);

  let factors: number[] = [];
  for (const node of currentNodes) {
    let counter = 0;
    let currentNode = node;
    while (currentNode.split("")[2] !== "Z") {
      currentNode =
        instructions[counter % instructions.length] === "L"
          ? desertMap[currentNode].left
          : desertMap[currentNode].right;

      counter++;
    }
    factors.push(...getPrimeFactors(counter));
  }
  const num = Array.from(new Set(factors)).reduce((a, b) => a * b);
  console.log(`Part B: ${num}`);
}
