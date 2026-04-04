'use client';

import { useState } from "react";
import type { InterpretationResult } from "./lib/iching";
import {
  calculatePresentInterpretation,
  calculateResultingInterpretation,
  parseLinesTopToBottom,
} from "./lib/iching";
import { getHexagramReading } from "./lib/readings";

const LINE_LABELS = [
  "Line 6 (top)",
  "Line 5",
  "Line 4",
  "Line 3",
  "Line 2",
  "Line 1 (bottom)",
];

export default function HexaChingApp() {
  const [lines, setLines] = useState<string[]>(Array(6).fill(""));

  const parsedLines = parseLinesTopToBottom(lines);
  const primaryResult = parsedLines ? calculatePresentInterpretation(parsedLines) : null;
  const relatingResult = parsedLines ? calculateResultingInterpretation(parsedLines) : null;
  const primaryReading = primaryResult ? getHexagramReading(primaryResult.hexagramNumber) : null;
  const relatingReading = relatingResult
    ? getHexagramReading(relatingResult.hexagramNumber)
    : null;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.28),_transparent_30%),linear-gradient(135deg,_rgba(17,24,39,0.96),_rgba(30,41,59,0.92)_55%,_rgba(15,23,42,0.98))] p-6 text-stone-50 shadow-[0_30px_120px_rgba(15,23,42,0.45)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-amber-100">
                I Ching Reader
              </div>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  HexaChing
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Enter six line values from top to bottom using 6, 7, 8, or 9 to reveal your hexagram.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm sm:p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Line Entry</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Fields are displayed as Line 6 at the top down to Line 1 at the bottom.
                  </p>
                </div>
                <div className="space-y-3">
                  {lines.map((value, index) => (
                    <LineInput
                      key={LINE_LABELS[index]}
                      label={LINE_LABELS[index]}
                      value={value}
                      onChange={(nextValue) => {
                        const nextLines = [...lines];
                        nextLines[index] = nextValue;
                        setLines(nextLines);
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setLines(Array(6).fill(""))}
                  className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-amber-200/50 hover:bg-white/8"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[28px] border border-slate-700/60 bg-slate-800/60 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  How It Works
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
                  Read the pattern
                </h2>
              </div>
              <ol className="space-y-3 text-sm leading-6 text-slate-300">
                <li>Enter six values using only 6, 7, 8, or 9.</li>
                <li>Primary shows the first hexagram produced by the cast.</li>
                <li>Relating shows the secondary hexagram produced by inverting moving lines.</li>
              </ol>
              <div className="rounded-3xl bg-slate-950 px-5 py-4 text-sm leading-6 text-slate-400">
                The calculation uses the traditional bottom-to-top line order internally even
                though the inputs are entered top-down for readability.
              </div>
            </div>
          </aside>

          <section className="rounded-[28px] border border-slate-700/60 bg-slate-800/60 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Interpretation
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
                  {primaryResult ? "Hexagram Match" : "Awaiting Complete Cast"}
                </h2>
              </div>

              {primaryResult ? (
                <>
                  <HexagramsBox primaryResult={primaryResult} relatingResult={relatingResult} />
                  <ReadingPanels
                    primaryResult={primaryResult}
                    relatingResult={relatingResult}
                    primaryReading={primaryReading}
                    relatingReading={relatingReading}
                  />
                </>
              ) : (
                <div className="rounded-[28px] border border-dashed border-slate-600 bg-slate-800/40 px-6 py-10 text-center">
                  <p className="text-lg font-medium text-slate-200">
                    Fill all six boxes to reveal the matching hexagram.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Once the cast is complete, the app will show the primary and relating
                    readings.
                  </p>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function LineInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
      <span className="text-sm font-medium text-slate-100">{label}</span>
      <input
        inputMode="numeric"
        maxLength={1}
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value.replace(/\D/g, "").slice(0, 1);
          if (nextValue === "" || ["6", "7", "8", "9"].includes(nextValue)) {
            onChange(nextValue);
          }
        }}
        className="h-11 w-20 rounded-xl border border-white/15 bg-slate-950/50 px-3 text-center text-lg font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/70 focus:ring-2 focus:ring-amber-200/30"
        placeholder="-"
        aria-label={label}
      />
    </label>
  );
}

function HexagramsBox({
  primaryResult,
  relatingResult,
}: {
  primaryResult: InterpretationResult;
  relatingResult: InterpretationResult | null;
}) {
  return (
    <div className="rounded-[30px] bg-[linear-gradient(180deg,_#1a2035,_#141929)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
            Primary Hexagram
          </p>
          <div className="w-32 rounded-[24px] bg-slate-950 px-5 py-6">
            <HexagramDiagram lines={primaryResult.lines} />
          </div>
          <p className="text-xl font-semibold tracking-tight text-slate-100">
            Hexagram {primaryResult.hexagramNumber}
          </p>
          <p className="text-sm font-medium text-amber-400">{primaryResult.hexagramName}</p>
        </div>
        {relatingResult && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
              Relating Hexagram
            </p>
            <div className="w-32 rounded-[24px] bg-slate-950 px-5 py-6">
              <HexagramDiagram lines={relatingResult.lines} />
            </div>
            <p className="text-xl font-semibold tracking-tight text-slate-100">
              Hexagram {relatingResult.hexagramNumber}
            </p>
            <p className="text-sm font-medium text-amber-400">{relatingResult.hexagramName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ReadingPanels({
  primaryResult,
  relatingResult,
  primaryReading,
  relatingReading,
}: {
  primaryResult: InterpretationResult | null;
  relatingResult: InterpretationResult | null;
  primaryReading: ReturnType<typeof getHexagramReading>;
  relatingReading: ReturnType<typeof getHexagramReading>;
}) {
  if (!primaryResult || !relatingResult || !primaryReading || !relatingReading) {
    return null;
  }

  return (
    <div className="grid gap-4">
      <PrimaryHexagramCard
        title={primaryReading.title}
        judgement={primaryReading.judgement?.paragraphs ?? []}
        image={primaryReading.image?.paragraphs ?? []}
      />
      {primaryReading.wisdom && (
        <WisdomCard
          title={primaryReading.title}
          wisdom={primaryReading.wisdom}
        />
      )}
      <LinesCard
        title={relatingReading.title}
        movingLines={primaryResult.movingLines}
        sameHexagram={primaryResult.hexagramNumber === relatingResult.hexagramNumber}
        lines={pickRelevantLines(relatingReading.lines, primaryResult.movingLines)}
      />
      <RelatingHexagramCard
        result={relatingResult}
        reading={relatingReading}
      />
      {primaryReading.waiGuang.length > 0 && (
        <WaiGuangCard
          title={primaryReading.title}
          items={primaryReading.waiGuang}
          tarotWriteup={primaryReading.tarotWriteup}
          qabalachWriteup={primaryReading.qabalachWriteup}
        />
      )}
      {primaryReading.quotations.length > 0 && (
        <QuotationsCard title={primaryReading.title} items={primaryReading.quotations} />
      )}
    </div>
  );
}

function PrimaryHexagramCard({
  title,
  judgement,
  image,
}: {
  title: string;
  judgement: string[];
  image: string[];
}) {
  return (
    <div className="rounded-[24px] border border-slate-700/60 bg-slate-800/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Primary Hexagram
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-100">{title}</h3>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            The Judgement
          </h4>
          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
            {judgement.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            The Image
          </h4>
          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
            {image.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatingHexagramCard({
  result,
  reading,
}: {
  result: InterpretationResult;
  reading: ReturnType<typeof getHexagramReading>;
}) {
  if (!reading) return null;
  return (
    <div className="rounded-[24px] border border-slate-700/60 bg-slate-800/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Relating Hexagram
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-[120px_1fr] sm:items-start">
        <div className="w-32 rounded-[24px] bg-slate-950 px-5 py-6">
          <HexagramDiagram lines={result.lines} />
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-100">
            Hexagram {result.hexagramNumber}
          </h3>
          <p className="mt-1 text-sm text-amber-400">{reading.title}</p>
          <h4 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            The Judgement
          </h4>
          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
            {(reading.judgement?.paragraphs ?? []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WisdomCard({
  title,
  wisdom,
}: {
  title: string;
  wisdom: { heading: string; paragraphs: string[] };
}) {
  return (
    <div className="rounded-[24px] border border-slate-700/60 bg-slate-800/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        The Wisdom of the Hexagram
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-100">{wisdom.heading}</h3>
      <p className="mt-1 text-sm text-amber-400">{title}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
        {wisdom.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function LinesCard({
  title,
  movingLines,
  sameHexagram,
  lines,
}: {
  title: string;
  movingLines: number[];
  sameHexagram: boolean;
  lines: { heading: string; paragraphs: string[] }[];
}) {
  return (
    <div className="rounded-[24px] border border-slate-700/60 bg-slate-800/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Moving Lines
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-100">Moving Lines</h3>
      <p className="mt-1 text-sm text-amber-400">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {movingLines.length > 0
          ? `Moving lines ${movingLines.join(", ")} were inverted to form the relating rune.`
          : sameHexagram
            ? "No moving lines were cast, so the relating rune remains the same."
            : "The relating rune was derived by inverting the moving lines."}
      </p>
      <div className="mt-5 space-y-5">
        {lines.length > 0 ? (
          lines.map((line) => (
            <section
              key={line.heading}
              className="rounded-2xl bg-slate-700/50 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
                {line.heading}
              </h4>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                {line.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-2xl bg-slate-700/50 px-4 py-4 text-sm leading-7 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            No moving lines were selected, so there are no relating line texts to display.
          </div>
        )}
      </div>
    </div>
  );
}

function HexagramDiagram({ lines }: { lines: InterpretationResult["lines"] }) {
  return (
    <div className="flex flex-col gap-3">
      {[...lines].reverse().map((value, index) => {
        const isYang = value === 7 || value === 9;
        const isMoving = value === 6 || value === 9;
        const lineClassName = isMoving ? "bg-amber-400" : "bg-slate-400";

        return (
          <div key={`${value}-${index}`} className="flex h-3 items-center gap-3">
            {isYang ? (
              <div className={`h-3 w-full rounded-full ${lineClassName}`} />
            ) : (
              <>
                <div className={`h-3 flex-1 rounded-full ${lineClassName}`} />
                <div className={`h-3 flex-1 rounded-full ${lineClassName}`} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}


function WaiGuangCard({
  title,
  items,
  tarotWriteup,
  qabalachWriteup,
}: {
  title: string;
  items: string[];
  tarotWriteup: { cardName: string; writeup: string } | null;
  qabalachWriteup: { writeup: string } | null;
}) {
  const [tarotOpen, setTarotOpen] = useState(false);
  const [qabalachOpen, setQabalachOpen] = useState(false);

  return (
    <div className="rounded-[24px] border border-slate-700/60 bg-slate-800/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Wai Guang — Outside Illustrations
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-100">
        External Correspondences
      </h3>
      <p className="mt-1 text-sm text-amber-400">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const isTarot = item.startsWith("Tarot");
          const isQabalah = item.startsWith("Qabalah");

          if (isTarot && tarotWriteup) {
            return (
              <li key={item} className="flex flex-col gap-0">
                <button
                  type="button"
                  onClick={() => setTarotOpen((o) => !o)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1 text-left transition hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                    <span className="text-sm leading-6 text-slate-300">{item}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {tarotOpen ? "▲ hide" : "▼ read more"}
                  </span>
                </button>
                {tarotOpen && (
                  <div className="ml-[22px] mt-2 rounded-2xl bg-slate-700/50 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                      {tarotWriteup.cardName}
                    </p>
                    <div className="space-y-3">
                      {tarotWriteup.writeup.split("\n\n").map((para, i) => (
                        <p key={i} className="text-sm leading-7 text-slate-300">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          }

          if (isQabalah && qabalachWriteup) {
            return (
              <li key={item} className="flex flex-col gap-0">
                <button
                  type="button"
                  onClick={() => setQabalachOpen((o) => !o)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1 text-left transition hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                    <span className="text-sm leading-6 text-slate-300">{item}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {qabalachOpen ? "▲ hide" : "▼ read more"}
                  </span>
                </button>
                {qabalachOpen && (
                  <div className="ml-[22px] mt-2 rounded-2xl bg-slate-700/50 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <div className="space-y-3">
                      {qabalachWriteup.writeup.split("\n\n").map((para, i) => (
                        <p key={i} className="text-sm leading-7 text-slate-300">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function QuotationsCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-slate-700/60 bg-slate-800/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Quotations
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-100">
        Illustrations from World Literature
      </h3>
      <p className="mt-1 text-sm text-amber-400">{title}</p>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <blockquote
            key={item}
            className="rounded-2xl bg-slate-700/50 px-4 py-3 text-sm leading-7 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            {item}
          </blockquote>
        ))}
      </div>
    </div>
  );
}

function pickRelevantLines(
  lines: { heading: string; paragraphs: string[] }[],
  movingLines: number[],
) {
  if (movingLines.length === 0) {
    return [];
  }

  const patterns = movingLines.map((lineNumber) => lineHeadingPattern(lineNumber));

  return lines.filter((line) => {
    const heading = line.heading.toLowerCase();
    if (movingLines.length === 6 && heading.includes("use of ")) {
      return true;
    }
    return patterns.some((pattern) => heading.includes(pattern));
  });
}

function lineHeadingPattern(lineNumber: number) {
  switch (lineNumber) {
    case 1:
      return "at the beginning";
    case 2:
      return "in the second place";
    case 3:
      return "in the third place";
    case 4:
      return "in the fourth place";
    case 5:
      return "in the fifth place";
    case 6:
      return "at the top";
    default:
      return "";
  }
}
