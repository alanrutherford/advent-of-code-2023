import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
interface SourceToDestinationMap {
  source: number;
  destination: number;
  range: number;
}
let sourceToDestinatonMaps: SourceToDestinationMap[][] = [];
const seeds: number[] = [];
export default function partA(): void {
  getInput()
    .split("\n\n")
    .forEach((STDMap) => {
      if (STDMap.startsWith("seeds: ")) {
        const numbers = STDMap.split(": ")[1];
        seeds.push(...numbers.split(" ").map((value) => parseInt(value)));
      } else {
        const mapping = STDMap.split(" map:\n")[1];
        const value = mapping.split("\n").map((line) => {
          const values = line.split(" ");
          return {
            destination: parseInt(values[0]),
            source: parseInt(values[1]),
            range: parseInt(values[2]),
          };
        });
        sourceToDestinatonMaps.push(value);
      }
    });
  const locations: number[] = [];
  seeds.forEach((seed) => {
    let seedIndex = seed;
    for (const [idx, mapping] of sourceToDestinatonMaps.entries()) {
      for (let i = 0; i < mapping.length; i++) {
        if (
          seedIndex >= mapping[i].source &&
          seedIndex <= mapping[i].source + mapping[i].range - 1
        ) {
          seedIndex = seedIndex + mapping[i].destination - mapping[i].source;
          break;
        }
      }
      if (idx === sourceToDestinatonMaps.length - 1) {
        locations.push(seedIndex);
      }
    }
  });
  locations.sort((a, b) => a - b);
  console.log(`Part A: ${locations[0]}`);
}
