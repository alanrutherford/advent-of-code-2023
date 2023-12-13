import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
export default function partA(): void {
  const input = getInput()
    .split("\n")
    .map((line) => {
      const [brokenRecord, orderRecord] = line.split(" ");
      return { brokenRecord, orderRecord };
    });
  const validateOption = (fixedRecord: string, orderRecord: string) => {
    const verification = [...fixedRecord.matchAll(/(#)\1{0,}/g)].map(
      (detection) => detection[0]
    );
    return (
      verification.map((hashes) => hashes.length).join(",") === orderRecord
    );
  };
  const getArrangements = (inputArr: string) => {
    const result: string[][] = [];
    let endNum = parseInt(inputArr.replace(/\./g, "0").replace(/\#/g, "1"), 2);
    let fromNum = parseInt(
      inputArr
        .replace(/\./g, "0")
        .replace(/\#/g, "1")
        .split("")
        .reverse()
        .join(""),
      2
    );

    for (let i = fromNum; i <= endNum; i++) {
      result.push(
        i
          .toString(2)
          .padStart(inputArr.length, "0")
          .replace(/0/g, ".")
          .replace(/1/g, "#")
          .split("")
      );
    }
    return result;
  };
  const generateOptions = (record: string, orderRecord: string) => {
    const numberOfUnknowns = (record.match(/\?/g) || []).length;
    const numberOfKnownBroken = (record.match(/\#/g) || []).length;
    const numberOfBrokenSprings = orderRecord
      .split(",")
      .map((num) => parseInt(num))
      .reduce((a, b) => a + b);
    const numberOfUknownBrokenSprings =
      numberOfBrokenSprings - numberOfKnownBroken;

    const sampleArray = [
      ...new Array(numberOfUknownBrokenSprings).fill("#"),
      ...new Array(numberOfUnknowns - numberOfUknownBrokenSprings).fill("."),
    ];

    const arrangements = getArrangements(sampleArray.join(""));
    const options: string[] = [];
    for (const option of arrangements) {
      let potentialOption: string = `${record}`;
      for (let i = 0; i < option.length; i++) {
        potentialOption = potentialOption.replace("?", option[i]);
      }
      options.push(potentialOption);
    }
    return options;
  };
  let score = 0;
  for (const line of input) {
    score += generateOptions(line.brokenRecord, line.orderRecord)
      .map((option) => validateOption(option, line.orderRecord))
      .filter((isValid) => isValid).length;
  }
  console.log(`Part A: ${score}`);
}
