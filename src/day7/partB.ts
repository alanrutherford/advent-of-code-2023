import { readFileSync } from "fs";
import { join } from "path";
function getInput() {
  return readFileSync(join(__dirname, "./input.txt"), "utf-8");
}
type CardValues = {
  [key: string]: number;
};
const cardValues: CardValues = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};
enum HandType {
  "FiveOfAKind",
  "FourOfAKind",
  "FullHouse",
  "ThreeOfAKind",
  "TwoPair",
  "OnePair",
  "HighCard",
}
const sortCards = (a: any, b: any) => {
  if (a.type !== b.type) {
    return b.type - a.type;
  } else if (a.hand[0] !== b.hand[0]) {
    return cardValues[a.hand[0]] - cardValues[b.hand[0]];
  } else if (a.hand[1] !== b.hand[1]) {
    return cardValues[a.hand[1]] - cardValues[b.hand[1]];
  } else if (a.hand[2] !== b.hand[2]) {
    return cardValues[a.hand[2]] - cardValues[b.hand[2]];
  } else if (a.hand[3] !== b.hand[3]) {
    return cardValues[a.hand[3]] - cardValues[b.hand[3]];
  }
  return cardValues[a.hand[4]] - cardValues[b.hand[4]];
};
const getJokerCase = (handArr: string[]) => {
  const noJokerHand = handArr.filter((card) => card !== "J");
  const sortedHandArr = noJokerHand.sort(
    (a, b) => cardValues[b] - cardValues[a]
  );
  const handSet = new Set(noJokerHand);
  const removedJs = handArr.length - noJokerHand.length;
  if (handSet.size === 1 || handSet.size === 0) {
    return HandType.FiveOfAKind;
  } else if (handSet.size === 2) {
    if (removedJs == 3 || removedJs == 2) return HandType.FourOfAKind;
    if (removedJs == 1) {
      if (
        (sortedHandArr[3] === sortedHandArr[2] &&
          sortedHandArr[2] === sortedHandArr[1]) ||
        (sortedHandArr[0] === sortedHandArr[1] &&
          sortedHandArr[1] === sortedHandArr[2])
      ) {
        return HandType.FourOfAKind;
      } else return HandType.FullHouse;
    }
  } else if (handSet.size === 3) {
    return HandType.ThreeOfAKind;
  } else if (handSet.size === 4) {
    return HandType.OnePair;
  }
};
const getType = (handArr: string[]) => {
  const handSet = new Set(handArr);
  if (handArr.includes("J")) {
    return getJokerCase(handArr);
  } else {
    const sortedHandArr = handArr.sort((a, b) => cardValues[b] - cardValues[a]);
    if (handSet.size === 1) {
      return HandType.FiveOfAKind;
    } else if (handSet.size === 2) {
      if (
        (sortedHandArr[4] === sortedHandArr[3] &&
          sortedHandArr[3] === sortedHandArr[2] &&
          sortedHandArr[2] === sortedHandArr[1]) ||
        (sortedHandArr[0] === sortedHandArr[1] &&
          sortedHandArr[1] === sortedHandArr[2] &&
          sortedHandArr[2] === sortedHandArr[3])
      ) {
        return HandType.FourOfAKind;
      } else return HandType.FullHouse;
    } else if (handSet.size === 3) {
      if (
        (sortedHandArr[4] === sortedHandArr[3] &&
          sortedHandArr[3] === sortedHandArr[2]) ||
        (sortedHandArr[3] === sortedHandArr[2] &&
          sortedHandArr[2] === sortedHandArr[1]) ||
        (sortedHandArr[2] === sortedHandArr[1] &&
          sortedHandArr[1] === sortedHandArr[0])
      ) {
        return HandType.ThreeOfAKind;
      } else return HandType.TwoPair;
    } else if (handSet.size === 4) {
      return HandType.OnePair;
    } else {
      return HandType.HighCard;
    }
  }
};
export default function partB(): void {
  const input = getInput()
    .split("\n")
    .map((line) => line.split(" "))
    .map((hand) => {
      return {
        hand: hand[0].split(""),
        score: parseInt(hand[1]),
        type: getType(hand[0].split("")),
      };
    });
  let winnings = 0;
  input.sort(sortCards);
  for (let rank = 0; rank < input.length; rank++) {
    winnings += (rank + 1) * input[rank].score;
  }
  console.log(`Part B: ${winnings}`);
}
