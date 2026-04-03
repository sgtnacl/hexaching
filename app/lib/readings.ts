import hexagrams from "./hexagrams_full.json";

type RawSection = {
  heading: string;
  level: number;
  content: string[];
};

type RawHexagram = {
  number: number;
  title: string;
  subtitle: string;
  sections: RawSection[];
};

export type ReadingSection = {
  heading: string;
  paragraphs: string[];
};

export type HexagramReading = {
  number: number;
  title: string;
  subtitle: string;
  judgement: ReadingSection | null;
  image: ReadingSection | null;
  wisdom: ReadingSection | null;
  lines: ReadingSection[];
};

const readingMap = new Map<number, HexagramReading>(
  (hexagrams as RawHexagram[]).map((entry) => [
    entry.number,
    {
      number: entry.number,
      title: entry.title,
      subtitle: entry.subtitle,
      judgement: findSection(entry.sections, "The Judgement"),
      image: findSection(entry.sections, "The Image"),
      wisdom: findWisdomSection(entry.sections),
      lines: entry.sections
        .filter((section) => section.level === 3)
        .map((section) => ({
          heading: section.heading,
          paragraphs: section.content,
        })),
    },
  ]),
);

export function getHexagramReading(number: number): HexagramReading | null {
  return readingMap.get(number) ?? null;
}

function findSection(sections: RawSection[], heading: string): ReadingSection | null {
  const section = sections.find((entry) => entry.heading === heading);
  if (!section) {
    return null;
  }

  return {
    heading: section.heading,
    paragraphs: section.content,
  };
}

function findWisdomSection(sections: RawSection[]): ReadingSection | null {
  const excluded = new Set(["Intro", "The Judgement", "The Image", "Structural Relatives"]);
  const section = sections.find(
    (entry) => entry.level === 2 && !excluded.has(entry.heading),
  );

  if (!section) {
    return null;
  }

  return {
    heading: section.heading,
    paragraphs: section.content,
  };
}
