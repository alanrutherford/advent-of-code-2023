import { readFileSync } from "fs";
import { join } from "path";
import { start } from "repl";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
type Point = {
  x: number;
  y: number;
};

interface PipePart {
  [key: string]: string[];
}
let pipeParts: PipePart = {
  "|": ["N", "S"],
  "-": ["W", "E"],
  "7": ["W", "S"],
  F: ["E", "S"],
  L: ["E", "N"],
  J: ["W", "N"],
};
function main(): void {
  const grid = getInput()
    .split("\n")
    .map((line) => line.split(""));
  const getStartingPoint = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "S") {
          return { x: j, y: i };
        }
      }
    }
  };

  const getNextPipeLocationStart = (
    currentPoint: Point,
    isStart: boolean = false
  ) => {
    const nextLocations = [
      {
        direction: "N",
        location: {
          x: currentPoint.x,
          y: currentPoint.y - 1,
        },
      },
      {
        direction: "S",
        location: {
          x: currentPoint.x,
          y: currentPoint.y + 1,
        },
      },
      {
        direction: "E",
        location: {
          x: currentPoint.x + 1,
          y: currentPoint.y,
        },
      },
      {
        direction: "W",
        location: {
          x: currentPoint.x - 1,
          y: currentPoint.y,
        },
      },
    ];

    //const currentLocation = grid[currentPoint.y][currentPoint.x];
    return nextLocations.filter((location) => {
      if (
        location.location.y < 0 ||
        location.location.y >= grid.length ||
        location.location.x < 0 ||
        location.location.x >= grid[0].length
      ) {
        return false;
      }

      const potentialLocation = grid[location.location.y][location.location.x];
      if (isStart) {
        if (potentialLocation === "S") {
          return false;
        }
      } else {
        if (potentialLocation === "S") {
          return true;
        }
      }
      if (potentialLocation === ".") {
        return false;
      }
      if (
        location.direction === "N" &&
        // pipeParts[currentLocation].includes("N") &&
        pipeParts[potentialLocation].includes("S")
      ) {
        return true;
      } else if (
        location.direction === "S" &&
        // pipeParts[currentLocation].includes("S") &&
        pipeParts[potentialLocation].includes("N")
      ) {
        return true;
      } else if (
        location.direction === "W" &&
        // pipeParts[currentLocation].includes("W") &&
        pipeParts[potentialLocation].includes("E")
      ) {
        return true;
      } else if (
        location.direction === "E" &&
        // pipeParts[currentLocation].includes("E") &&
        pipeParts[potentialLocation].includes("W")
      ) {
        return true;
      }

      return false;
    });
  };
  const getNextPipeLocation = (
    currentPoint: Point,
    isStart: boolean = false
  ) => {
    const nextLocations = [
      {
        direction: "N",
        location: {
          x: currentPoint.x,
          y: currentPoint.y - 1,
        },
      },
      {
        direction: "S",
        location: {
          x: currentPoint.x,
          y: currentPoint.y + 1,
        },
      },
      {
        direction: "E",
        location: {
          x: currentPoint.x + 1,
          y: currentPoint.y,
        },
      },
      {
        direction: "W",
        location: {
          x: currentPoint.x - 1,
          y: currentPoint.y,
        },
      },
    ];
    const currentLocation = grid[currentPoint.y][currentPoint.x];
    return nextLocations.filter((location) => {
      if (isStart && currentLocation === "S") {
        return false;
      }
      if (
        location.location.y < 0 ||
        location.location.y >= grid.length ||
        location.location.x < 0 ||
        location.location.x >= grid[0].length
      ) {
        return false;
      }
      const potentialLocation = grid[location.location.y][location.location.x];

      if (potentialLocation === "S" || potentialLocation === ".") {
        return false;
      }

      if (
        location.direction === "N" &&
        pipeParts[currentLocation].includes("N") &&
        pipeParts[potentialLocation].includes("S")
      ) {
        return true;
      } else if (
        location.direction === "S" &&
        pipeParts[currentLocation].includes("S") &&
        pipeParts[potentialLocation].includes("N")
      ) {
        return true;
      } else if (
        location.direction === "W" &&
        pipeParts[currentLocation].includes("W") &&
        pipeParts[potentialLocation].includes("E")
      ) {
        return true;
      } else if (
        location.direction === "E" &&
        pipeParts[currentLocation].includes("E") &&
        pipeParts[potentialLocation].includes("W")
      ) {
        return true;
      }

      return false;
    });
  };
  const areSamePoint = (pointA: Point, pointB: Point) => {
    return pointA.x === pointB.x && pointA.y === pointB.y;
  };
  const startPoint = getStartingPoint();
  if (!startPoint) {
    return;
  }
  const startPipes = getNextPipeLocationStart(startPoint, true);
  let pointerPipes = startPipes;
  let prevPoints = [startPoint, startPoint];
  let steps = 1;
  const pipePath = new Set<string>();
  pipePath.add(`x${startPoint.x}:y${startPoint.y}`);
  pipePath.add(`x${startPipes[0].location.x}:y${startPipes[0].location.y}`);
  pipePath.add(`x${startPipes[1].location.x}:y${startPipes[1].location.y}`);

  while (true) {
    const nextPipeLocation1 = getNextPipeLocation(
      pointerPipes[0].location,
      false
    ).filter((pipe) => !areSamePoint(prevPoints[0], pipe.location))[0];

    const nextPipeLocation2 = getNextPipeLocation(
      pointerPipes[1].location,
      false
    ).filter((pipe) => !areSamePoint(prevPoints[1], pipe.location))[0];
    prevPoints = [pointerPipes[0].location, pointerPipes[1].location]; //, pointerPipes[1].location];
    pointerPipes = [nextPipeLocation1, nextPipeLocation2]; //, nextPipeLocation2];
    steps++;
    pipePath.add(
      `x${nextPipeLocation1.location.x}:y${nextPipeLocation1.location.y}`
    );
    pipePath.add(
      `x${nextPipeLocation2.location.x}:y${nextPipeLocation2.location.y}`
    );
    if (areSamePoint(nextPipeLocation1.location, nextPipeLocation2.location)) {
      break;
    }
  }
  //Part B
  let count = 0;
  let prevPos = ".";
  for (let j = 0; j < grid.length; j++) {
    let insidePolygon = false;

    for (let i = 0; i < grid[j].length; i++) {
      if (grid[j][i] === "S") {
        grid[j][i] = "|";
      }
      if (pipePath.has(`x${i}:y${j}`) && grid[j][i] === "|") {
        insidePolygon = !insidePolygon;
      } else if (
        pipePath.has(`x${i}:y${j}`) &&
        ["F", "L"].includes(grid[j][i])
      ) {
        prevPos = grid[j][i];
      } else if (
        pipePath.has(`x${i}:y${j}`) &&
        ["J", "7"].includes(grid[j][i])
      ) {
        if (prevPos === "F" && grid[j][i] === "J") {
          insidePolygon = !insidePolygon;
        } else if (prevPos === "L" && grid[j][i] === "7") {
          insidePolygon = !insidePolygon;
        } else {
          prevPos = ".";
        }
      }
      if (insidePolygon && !pipePath.has(`x${i}:y${j}`)) {
        count++;
        grid[j][i] = "x";
      }
    }
  }
  console.log(`Part A: ${steps} `);
  console.log(`Part B: ${count} `);
}
main();
