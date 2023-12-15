import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partB(): void {
  interface Box {
    [key: string]: { label: string; focalLength: number }[];
  }
  let boxes: Box = {};
  const input = getInput()
    .split(",")
    .map((sequence) => {
      if (sequence.includes("=")) {
        const splitStr = sequence.split("=");
        return {
          label: splitStr[0],
          operation: "=",
          focalLength: parseInt(splitStr[1]),
        };
      } else {
        const splitStr = sequence.split("-");
        return {
          label: splitStr[0],
          operation: "-",
        };
      }
    });
  for (let i = 0; i < 256; i++) {
    boxes[`${i}`] = [];
  }
  for (const step of input) {
    let currentValue = 0;
    for (let i = 0; i < step.label.length; i++) {
      currentValue += step.label.charCodeAt(i);
      currentValue *= 17;
      currentValue = currentValue % 256;
    }
    if (step.operation === "=") {
      if (!step.focalLength) {
        break;
      }
      if (
        boxes[`${currentValue}`].filter(
          (contents) => contents.label === step.label
        ).length > 0
      ) {
        boxes[currentValue] = boxes[currentValue].map((box) => {
          if (box.label === step.label) {
            return { label: step.label, focalLength: step.focalLength };
          } else return box;
        });
      } else {
        boxes[`${currentValue}`].push({
          label: step.label,
          focalLength: step.focalLength,
        });
      }
    } else {
      boxes[`${currentValue}`] = boxes[`${currentValue}`].filter(
        (contents) => contents.label != step.label
      );
    }
  }
  let total = 0;
  for (const box in boxes) {
    if (boxes[box].length > 0) {
      boxes[box].forEach((contents, index) => {
        total += (parseInt(box) + 1) * (index + 1) * contents.focalLength;
      });
    }
  }

  console.log(`Part B: ${total}`);
}
