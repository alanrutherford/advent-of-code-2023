import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

const numberOfCycles = 1000000000;
export default function partB(): void {
  const input = getInput().split("\n");
  let cycled: string[] = input;
  const goNorth = (platform: string[]) => {
    let tilted: string[] = Array(platform.length).join(".").split(".");
    for (let j = 0; j < platform[0].length; j++) {
      const column1 = platform.map((line) => line[j]).join("");
      const splitColumn = column1.split("#");
      const sorted = splitColumn
        .map((freeSpace) =>
          freeSpace.split("").sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
        )
        .map((line) => line.join(""))
        .join("#");
      for (let i = 0; i < sorted.length; i++) {
        tilted[i] = tilted[i].concat(sorted[i]);
      }
    }
    return tilted;
  };
  const goWest = (platform: string[]) => {
    let tilted: string[] = [];
    for (let j = 0; j < platform[0].length; j++) {
      const sorted = platform[j]
        .split("#")
        .map((freeSpace) =>
          freeSpace.split("").sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
        )
        .map((line) => line.join(""))
        .join("#");
      tilted.push(sorted);
    }

    return tilted;
  };
  const goSouth = (platform: string[]) => {
    let tilted: string[] = Array(platform.length).join(".").split(".");
    for (let j = 0; j < platform[0].length; j++) {
      const column1 = platform
        .map((line) => line[j])
        .join("")
        .split("")
        .reverse()
        .join("");
      const splitColumn = column1.split("#");
      const sorted = splitColumn
        .map((freeSpace) =>
          freeSpace.split("").sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
        )
        .map((line) => line.join(""))
        .join("#")
        .split("")
        .reverse()
        .join("");
      for (let i = 0; i < sorted.length; i++) {
        tilted[i] = tilted[i].concat(sorted[i]);
      }
    }

    return tilted;
  };

  const goEast = (platform: string[]) => {
    let tilted: string[] = [];
    for (let j = 0; j < platform[0].length; j++) {
      tilted.push(
        platform[j]
          .split("")
          .reverse()
          .join("")
          .split("#")
          .map((freeSpace) =>
            freeSpace
              .split("")
              .sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
          )
          .map((line) => line.join(""))
          .join("#")
          .split("")
          .reverse()
          .join("")
      );
    }

    return tilted;
  };
  const cycle = (platform: string[]) => {
    return goEast(goSouth(goWest(goNorth(platform))));
  };
  interface Result {
    [key: string]: number;
  }
  let results: Result = {};
  let seenAt: number | undefined = undefined;
  let cycleIndex = 0;
  const loads: number[] = [];
  for (let i = 0; seenAt === undefined; i++) {
    let load = 0;
    cycled = cycle(cycled);
    for (let i = 0; i < cycled.length; i++) {
      const numRoundBoulders = (cycled[i].match(/O/g) || []).length;
      load += numRoundBoulders * (cycled.length - i);
    }
    const platformHash = cycled.map((l) => l).join("");
    seenAt = results[platformHash];
    if (seenAt === undefined) {
      cycleIndex = i + 1;
      results[platformHash] = cycleIndex;
      loads[cycleIndex] = load;
    }
  }
  cycleIndex += 1;
  const loadIndex =
    ((numberOfCycles - seenAt) % (cycleIndex - seenAt)) + seenAt;

  console.log(`Part B: ${loads[loadIndex]}`);
}
