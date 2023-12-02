import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

type Game = { gameId: number; red: number[]; blue: number[]; green: number[] };
let games: Game[] = [];
export default function partB(): void {
  getInput()
    .split("\n")
    .map((game) => {
      const [gameNumber, colourFuls] = game.split(":");
      const currentGame: number = parseInt(gameNumber.split(" ")[1]);
      const subSet = colourFuls.split(";");
      let green: number[] = [];
      let red: number[] = [];
      let blue: number[] = [];
      subSet.forEach((game) => {
        const gameResults = game.split(",");
        gameResults.forEach((colour) => {
          const colourResult = colour.split(" ");
          const colourNumber = parseInt(colourResult[1].trim());
          if (colourResult[2] === "red") {
            red.push(colourNumber);
          } else if (colourResult[2] === "blue") {
            blue.push(colourNumber);
          } else if (colourResult[2] === "green") {
            green.push(colourNumber);
          }
        });
      });
      games.push({ gameId: currentGame, red, blue, green });
    });
  const thePowers = games
    .map((game) => {
      const maxRed = game.red.sort((a, b) => b - a)[0];
      const maxGreen = game.green.sort((a, b) => b - a)[0];
      const maxBlue = game.blue.sort((a, b) => b - a)[0];
      return maxBlue * maxGreen * maxRed;
    })
    .reduce((a, b) => a + b);
  console.log(`Part B: ${thePowers}`);
}
