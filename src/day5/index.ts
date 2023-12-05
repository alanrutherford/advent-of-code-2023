import partA from "./partA";
import partB from "./partB";
let partAtime = process.hrtime.bigint();
partA();
let partBtime = process.hrtime.bigint();
console.log(
  `Part A done in ${partBtime} - ${partAtime}: ${partBtime - partAtime}ns`
);
partB();
let endTime = process.hrtime.bigint();
console.log(`Part B done in ${endTime - partBtime}ns`);
