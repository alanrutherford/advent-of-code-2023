import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const input = getInput()
    .split("\n")
    .map((line) => {
      const game = line.split(":");
      const [winningNumbers, hand] = game[1].split("|");
      return {
        winningNumbers: winningNumbers
          .trim()
          .split(" ")
          .map((num) => parseInt(num))
          .filter((num) => !isNaN(num)),
        hand: hand
          .trim()
          .split(" ")
          .map((num) => parseInt(num))
          .filter((num) => !isNaN(num)),
      };
    });
  let score = 0;
  input.forEach((game) => {
    let matches = 0;
    for (const num of game.winningNumbers) {
      if (game.hand.includes(num)) {
        matches++;
      }
    }
    score += matches <= 1 ? matches : Math.pow(2, matches - 1);
  });
  console.log(`Part A: ${score}`);
}
