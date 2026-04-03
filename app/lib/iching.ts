export type LineValue = 6 | 7 | 8 | 9;

export type InterpretationResult = {
  hexagramNumber: number;
  hexagramName: string;
  movingLines: number[];
  lines: LineValue[];
};

const HEXAGRAM_NAMES = [
  "",
  "The Creative",
  "The Receptive",
  "Difficulty at the Beginning",
  "Youthful Folly",
  "Waiting",
  "Conflict",
  "The Army",
  "Holding Together",
  "Small Taming",
  "Treading",
  "Peace",
  "Standstill",
  "Fellowship",
  "Possession in Great Measure",
  "Modesty",
  "Enthusiasm",
  "Following",
  "Work on the Spoiled",
  "Approach",
  "Contemplation",
  "Biting Through",
  "Grace",
  "Splitting Apart",
  "Return",
  "Innocence",
  "Great Taming",
  "Corners of the Mouth",
  "Preponderance of the Great",
  "The Abysmal (Water)",
  "The Clinging (Fire)",
  "Influence",
  "Duration",
  "Retreat",
  "Power of the Great",
  "Progress",
  "Darkening of the Light",
  "The Family",
  "Opposition",
  "Obstruction",
  "Deliverance",
  "Decrease",
  "Increase",
  "Break-through",
  "Coming to Meet",
  "Gathering Together",
  "Pushing Upward",
  "Oppression",
  "The Well",
  "Revolution",
  "The Caldron",
  "The Arousing (Thunder)",
  "Keeping Still (Mountain)",
  "Development",
  "The Marrying Maiden",
  "Abundance",
  "The Wanderer",
  "The Gentle (Wind)",
  "The Joyous (Lake)",
  "Dispersion",
  "Limitation",
  "Inner Truth",
  "Preponderance of the Small",
  "After Completion",
  "Before Completion",
] as const;

const KING_WEN = [
  [1, 43, 14, 34, 9, 5, 26, 11],
  [10, 58, 38, 54, 61, 60, 41, 19],
  [13, 49, 30, 55, 37, 63, 22, 36],
  [25, 17, 21, 51, 42, 3, 27, 24],
  [44, 28, 50, 32, 57, 48, 18, 46],
  [6, 47, 64, 40, 59, 29, 4, 7],
  [33, 31, 56, 62, 53, 39, 52, 15],
  [12, 45, 35, 16, 20, 8, 23, 2],
] as const;

export function isCompleteLineSet(
  lines: string[],
): lines is [string, string, string, string, string, string] {
  return (
    lines.length === 6 &&
    lines.every((line) => line === "6" || line === "7" || line === "8" || line === "9")
  );
}

export function parseLinesTopToBottom(lines: string[]): LineValue[] | null {
  if (!isCompleteLineSet(lines)) {
    return null;
  }

  return lines.map((line) => Number(line) as LineValue);
}

export function calculatePresentInterpretation(linesTopToBottom: LineValue[]): InterpretationResult {
  return calculateInterpretation(toBottomToTop(linesTopToBottom));
}

export function calculateResultingInterpretation(linesTopToBottom: LineValue[]): InterpretationResult {
  const resultingLines = toBottomToTop(linesTopToBottom).map((line) => {
    if (line === 6) return 7;
    if (line === 9) return 8;
    return line;
  }) as LineValue[];

  return calculateInterpretation(resultingLines);
}

function toBottomToTop(linesTopToBottom: LineValue[]): LineValue[] {
  return [
    linesTopToBottom[5],
    linesTopToBottom[4],
    linesTopToBottom[3],
    linesTopToBottom[2],
    linesTopToBottom[1],
    linesTopToBottom[0],
  ];
}

function calculateInterpretation(linesBottomToTop: LineValue[]): InterpretationResult {
  const movingLines = linesBottomToTop
    .map((value, index) => (value === 6 || value === 9 ? index + 1 : null))
    .filter((value): value is number => value !== null);

  const binaryLines = linesBottomToTop.map((value) => {
    if (value === 6 || value === 8) return 0;
    return 1;
  });

  const lowerBits = binaryLines[0] | (binaryLines[1] << 1) | (binaryLines[2] << 2);
  const upperBits = binaryLines[3] | (binaryLines[4] << 1) | (binaryLines[5] << 2);

  const lowerTrigram = trigramIndex(lowerBits);
  const upperTrigram = trigramIndex(upperBits);
  const hexagramNumber = KING_WEN[lowerTrigram][upperTrigram];

  return {
    hexagramNumber,
    hexagramName: HEXAGRAM_NAMES[hexagramNumber],
    movingLines,
    lines: linesBottomToTop,
  };
}

function trigramIndex(bits: number): number {
  switch (bits) {
    case 0b111:
      return 0;
    case 0b110:
      return 1;
    case 0b101:
      return 2;
    case 0b100:
      return 3;
    case 0b011:
      return 4;
    case 0b010:
      return 5;
    case 0b001:
      return 6;
    case 0b000:
      return 7;
    default:
      throw new Error(`Unexpected trigram bits: ${bits}`);
  }
}
