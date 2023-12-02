import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
type Game = { gameId: number; result: boolean };
let games: Game[] = [];
export default function partA(): void {
  const possibleReds = 12;
  const possibleGreens = 13;
  const possibleBlues = 14;
  getInput()
    .split("\n")
    .map((game) => {
      const [gameNumber, colourFuls] = game.split(":");
      const currentGame: number = parseInt(gameNumber.split(" ")[1]);
      const subSet = colourFuls.split(";");
      let gameResult: boolean = true;
      subSet.forEach((game) => {
        const gameResults = game.split(",");
        gameResults.forEach((colour) => {
          const colourResult = colour.split(" ");
          const colourNumber = colourResult[1].trim();
          if (
            colourResult[2] === "red" &&
            parseInt(colourNumber) > possibleReds
          ) {
            gameResult = false;
          } else if (
            colourResult[2] === "blue" &&
            parseInt(colourNumber) > possibleBlues
          ) {
            gameResult = false;
          } else if (
            colourResult[2] === "green" &&
            parseInt(colourNumber) > possibleGreens
          ) {
            gameResult = false;
          }
        });
      });
      games.push({ gameId: currentGame, result: gameResult });
    });

  let rollingIds = 0;
  games.forEach((game) => {
    if (game.result) {
      rollingIds += game.gameId;
    }
  });
  console.log(`Part A: ${rollingIds}`);
}
