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
export default function partB(): void {
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
  let location: number = Number.MAX_VALUE;
  for (let seedNumber = 0; seedNumber < seeds.length; seedNumber += 2) {
    let range = seeds[seedNumber + 1];
    let startRange = seeds[seedNumber];
    //cpu go brrrrrrr
    for (let seedyBoi = startRange; seedyBoi < startRange + range; seedyBoi++) {
      let seedyBoiIndex = seedyBoi;
      for (const [idx, mapping] of sourceToDestinatonMaps.entries()) {
        for (let i = 0; i < mapping.length; i++) {
          if (
            seedyBoiIndex >= mapping[i].source &&
            seedyBoiIndex <= mapping[i].source + mapping[i].range - 1
          ) {
            seedyBoiIndex =
              seedyBoiIndex + mapping[i].destination - mapping[i].source;
            break;
          }
        }
        if (idx === sourceToDestinatonMaps.length - 1) {
          if (seedyBoiIndex < location) {
            console.log(`updating location: ${seedyBoiIndex}`);
            location = seedyBoiIndex;
            seedyBoi += seedyBoiIndex + range;
          }
        }
      }
    }
  }

  console.log(`Part B: ${location}`);
}
