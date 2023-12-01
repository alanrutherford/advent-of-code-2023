import { readFileSync } from "fs";
import { join } from "path";

function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput().split("\n");
  const answer = input
    .map((line) => line.split(""))
    .map((lineArr) => lineArr.filter((char) => char >= "0" && char <= "9"))
    .map((nums) => parseInt(nums[0] + nums[nums.length - 1]))
    .reduce((a, b) => a + b);
  console.log(`Part A: ${answer} `);
}
