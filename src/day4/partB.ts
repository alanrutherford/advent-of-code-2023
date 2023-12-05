import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
export default function partB(): void {
  const input = getInput()
    .split("\n")
    .map((line) => {
      const game = line.split(":");
      const [winningNumbers, hand] = game[1].split("|");
      const gameNumber = parseInt(game[0].trim().split("Card")[1]);
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
        game: gameNumber,
        copies: 1,
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
    for (let i = 1; i <= matches && game.game + i <= input.length; i++) {
      input[game.game - 1 + i].copies += game.copies;
    }
  });
  for (const game of input) {
    score += game.copies;
  }
  console.log(`Part B: ${score}`);
}
