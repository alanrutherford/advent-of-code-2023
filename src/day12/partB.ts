import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}

export default function partB(): void {
  const input = getInput()
    .split("\n")
    .map((line) => {
      const [brokenRecord, orderRecord] = line.split(" ");
      // return { brokenRecord, orderRecord };

      return {
        brokenRecord: `${brokenRecord}?${brokenRecord}?${brokenRecord}?${brokenRecord}?${brokenRecord}`,
        orderRecord: `${orderRecord},${orderRecord},${orderRecord},${orderRecord},${orderRecord}`,
      };
    });
  const validated = new Set<string>();
  const validateString = (fixedRecord: string, orderRecord: string) => {
    const verification = [...fixedRecord.matchAll(/(#)\1{0,}/g)].map(
      (detection) => detection[0]
    );
    return (
      verification.map((hashes) => hashes.length).join(",") === orderRecord
    );
  };
  const validateOptions = (
    index: number,
    crawlingString: string,
    orderRecord: string
  ): number => {
    //check amount of # in string
    const numberOfBrokenStringsSoFar = (crawlingString.match(/\#/g) || [])
      .length;
    //
    const numberOfBrokenSprings = orderRecord
      .split(",")
      .map((num) => parseInt(num))
      .reduce((a, b) => a + b);
    // console.log({ numberOfBrokenStringsSoFar, numberOfBrokenSprings });
    if (numberOfBrokenStringsSoFar === numberOfBrokenSprings) {
      if (validateString(crawlingString, orderRecord)) {
        validated.has;
      }
      return 0;
    }
    if ((crawlingString.match(/\?/g) || []).length === 0) {
      return 0;
    }
    if (
      (crawlingString.match(/\?/g) || []).length <
      numberOfBrokenSprings - numberOfBrokenStringsSoFar
    ) {
      return 0;
    }
    const optionEmpty = crawlingString.replace("?", ".");
    const optionBroken = crawlingString.replace("?", "#");
    // console.log(optionBroken);
    return (
      validateOptions(index, optionEmpty, orderRecord) +
      validateOptions(index, optionBroken, orderRecord)
    );
  };
  let validOptions = 0;
  for (let i = 0; i < input.length; i++) {
    const numberOfBrokenSprings = input[i].orderRecord
      .split(",")
      .map((num) => parseInt(num))
      .reduce((a, b) => a + b);
    console.log(numberOfBrokenSprings);
    validOptions += validateOptions(
      i,
      input[i].brokenRecord,
      input[i].orderRecord
    );
  }
  // console.log(input[0].brokenRecord.replace("?", "#"));

  console.log(`Part B: ${validOptions}`);
}
