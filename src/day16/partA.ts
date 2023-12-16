import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partA(): void {
  const grid = getInput()
    .split("\n")
    .map((line) => line.split(""));
  const energisedLocations = new Set<string>(); //format: `x:num,y:num`
  const beamLocationHistory = new Set<string>(); //format: `x:num,y:num,d:Direction`
  type Direction = "N" | "S" | "E" | "W";
  type Beam = {
    direction: Direction;
    location: { x: number; y: number };
    isActive: boolean;
  };
  const beams: Beam[] = [];
  const updateLocation = (
    currentLocation: { x: number; y: number },
    currentDirection: Direction
  ) => {
    let newLocation: { x: number; y: number } = { x: 0, y: 0 };
    switch (currentDirection) {
      case "N":
        newLocation.x = currentLocation.x;
        newLocation.y = currentLocation.y - 1;
        break;
      case "S":
        newLocation.x = currentLocation.x;
        newLocation.y = currentLocation.y + 1;
        break;
      case "E":
        newLocation.x = currentLocation.x + 1;
        newLocation.y = currentLocation.y;
        break;
      case "W":
        newLocation.x = currentLocation.x - 1;
        newLocation.y = currentLocation.y;
        break;
      default:
        newLocation.x = currentLocation.x;
        newLocation.y = currentLocation.y;
        console.log("something went terribly wrong1");
        break;
    }
    return newLocation;
  };
  const updateDirection = (
    currentLocation: {
      x: number;
      y: number;
    },
    currentDirection: Direction
  ) => {
    const currentEncounter = grid[currentLocation.y][currentLocation.x];
    let newDirection: Direction = "S"; //random direction to satisfy typescript and make things easy
    switch (currentEncounter) {
      case ".":
        newDirection = currentDirection;
        //Do Nothing
        break;
      case "/":
        if (currentDirection === "N") {
          newDirection = "E";
        } else if (currentDirection === "S") {
          newDirection = "W";
        } else if (currentDirection === "W") {
          newDirection = "S";
        } else if (currentDirection === "E") {
          newDirection = "N";
        }
        break;
      case "\\":
        if (currentDirection === "N") {
          newDirection = "W";
        } else if (currentDirection === "S") {
          newDirection = "E";
        } else if (currentDirection === "W") {
          newDirection = "N";
        } else if (currentDirection === "E") {
          newDirection = "S";
        }
        break;
      case "-":
        if (["N", "S"].includes(currentDirection)) {
          newDirection = "W";
          beams.push({
            direction: "E",
            location: currentLocation,
            isActive: true,
          });
        } else {
          newDirection = currentDirection;
        }
        break;
      case "|":
        if (["W", "E"].includes(currentDirection)) {
          newDirection = "N";
          beams.push({
            direction: "S",
            location: currentLocation,
            isActive: true,
          });
        } else {
          newDirection = currentDirection;
        }
        break;
      default:
        console.log("something went very wrong2");
        newDirection = currentDirection;
        break;
    }
    return newDirection;
  };
  beams.push({ direction: "E", location: { x: -1, y: 0 }, isActive: true });
  const gridBoundsX = grid[0].length;
  const gridBoundsY = grid.length;
  let reachedTheEnd = false;
  while (!reachedTheEnd) {
    for (let i = 0; i < beams.length; i++) {
      if (beams[i].isActive === false) {
        continue;
      }
      beams[i].location = updateLocation(beams[i].location, beams[i].direction);

      if (
        beams[i].location.x >= gridBoundsX ||
        beams[i].location.y >= gridBoundsY ||
        beams[i].location.x < 0 ||
        beams[i].location.y < 0
      ) {
        //delete the beam
        beams[i].isActive = false;
        continue;
      }
      beams[i].direction = updateDirection(
        beams[i].location,
        beams[i].direction
      );
      if (
        !energisedLocations.has(
          `x:${beams[i].location.x},y:${beams[i].location.y}`
        )
      ) {
        energisedLocations.add(
          `x:${beams[i].location.x},y:${beams[i].location.y}`
        );
      }
      if (
        beamLocationHistory.has(
          `x:${beams[i].location.x},y:${beams[i].location.y},d:${beams[i].direction}`
        )
      ) {
        beams[i].isActive = false;
        continue;
      } else {
        beamLocationHistory.add(
          `x:${beams[i].location.x},y:${beams[i].location.y},d:${beams[i].direction}`
        );
      }
    }
    if (beams.filter((beam) => beam.isActive === true).length === 0) {
      reachedTheEnd = true;
    }
  }
  console.log(`Part A: ${energisedLocations.size}`);
}
