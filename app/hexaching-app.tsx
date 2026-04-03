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
  const presentResult = parsedLines ? calculatePresentInterpretation(parsedLines) : null;
  const resultingResult = parsedLines ? calculateResultingInterpretation(parsedLines) : null;
  const presentReading = presentResult ? getHexagramReading(presentResult.hexagramNumber) : null;
  const resultingReading = resultingResult
    ? getHexagramReading(resultingResult.hexagramNumber)
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
                  Enter six line values from top to bottom using 6, 7, 8, or 9. The app
                  calculates the primary hexagram, reads its Judgement and Image, then
                  inverts the moving lines to reveal the resulting Lines.
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
          <aside className="rounded-[28px] border border-stone-200/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(148,163,184,0.14)] backdrop-blur">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                  How It Works
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                  Read the pattern
                </h2>
              </div>
              <ol className="space-y-3 text-sm leading-6 text-stone-700">
                <li>Enter six values using only 6, 7, 8, or 9.</li>
                <li>Present shows the primary hexagram and its core text.</li>
                <li>Moving lines are inverted to reveal the resulting hexagram and its lines.</li>
              </ol>
              <div className="rounded-3xl bg-stone-950 px-5 py-4 text-sm leading-6 text-stone-300">
                The calculation uses the traditional bottom-to-top line order internally even
                though the inputs are entered top-down for readability.
              </div>
            </div>
          </aside>

          <section className="rounded-[28px] border border-stone-200/70 bg-white/85 p-6 shadow-[0_20px_80px_rgba(148,163,184,0.14)] backdrop-blur">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                    Interpretation
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                    {presentResult ? "Hexagram Match" : "Awaiting Complete Cast"}
                  </h2>
                </div>
              </div>

              {presentResult ? (
                <>
                  <ResultCard result={presentResult} />
                  <CompactSummary
                    title="Present"
                    subtitle="Primary hexagram from your cast"
                    result={presentResult}
                  />
                  <ReadingPanels
                    presentResult={presentResult}
                    resultingResult={resultingResult}
                    presentReading={presentReading}
                    resultingReading={resultingReading}
                  />
                </>
              ) : (
                <div className="rounded-[28px] border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center">
                  <p className="text-lg font-medium text-stone-900">
                    Fill all six boxes to reveal the matching hexagram.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Once the cast is complete, the app will show the primary reading and the
                    resulting lines.
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

function ResultCard({ result }: { result: InterpretationResult }) {
  return (
    <div className="rounded-[30px] bg-[linear-gradient(180deg,_#fffdf8,_#f7f4ea)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-6">
      <div className="grid gap-6 sm:grid-cols-[140px_1fr] sm:items-center">
        <div className="rounded-[24px] bg-stone-950 px-5 py-6">
          <HexagramDiagram lines={result.lines} />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
            Present Hexagram
          </p>
          <div>
            <h3 className="text-3xl font-semibold tracking-tight text-stone-950">
              Hexagram {result.hexagramNumber}
            </h3>
            <p className="mt-1 text-lg font-medium text-amber-900">{result.hexagramName}</p>
          </div>
          <p className="text-sm leading-6 text-stone-700">
            {result.movingLines.length > 0
              ? `Moving lines: ${result.movingLines.join(", ")}`
              : "No moving lines in this cast."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReadingPanels({
  presentResult,
  resultingResult,
  presentReading,
  resultingReading,
}: {
  presentResult: InterpretationResult | null;
  resultingResult: InterpretationResult | null;
  presentReading: ReturnType<typeof getHexagramReading>;
  resultingReading: ReturnType<typeof getHexagramReading>;
}) {
  if (!presentResult || !resultingResult || !presentReading || !resultingReading) {
    return null;
  }

  return (
    <div className="grid gap-4">
      <ReadingCard
        eyebrow="Primary Reading"
        title={presentReading.title}
        subtitle="The Judgement"
        paragraphs={presentReading.judgement?.paragraphs ?? []}
      />
      <ReadingCard
        eyebrow="Primary Reading"
        title={presentReading.title}
        subtitle="The Image"
        paragraphs={presentReading.image?.paragraphs ?? []}
      />
      <ReadingCard
        eyebrow="Primary Reading"
        title={presentReading.title}
        subtitle="The Wisdom of Hexagram"
        paragraphs={presentReading.wisdom?.paragraphs ?? []}
      />
      <LinesCard
        title={resultingReading.title}
        movingLines={presentResult.movingLines}
        sameHexagram={presentResult.hexagramNumber === resultingResult.hexagramNumber}
        lines={pickRelevantLines(resultingReading.lines, presentResult.movingLines)}
      />
    </div>
  );
}

function ReadingCard({
  eyebrow,
  title,
  subtitle,
  paragraphs,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}) {
  return (
    <div className="rounded-[24px] border border-stone-200 bg-stone-50/90 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{eyebrow}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-950">{subtitle}</h3>
      <p className="mt-1 text-sm text-amber-900">{title}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
        {paragraphs.map((paragraph) => (
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
    <div className="rounded-[24px] border border-stone-200 bg-stone-50/90 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
        Moving Lines
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-950">Moving Lines</h3>
      <p className="mt-1 text-sm text-amber-900">{title}</p>
      <p className="mt-3 text-sm leading-6 text-stone-700">
        {movingLines.length > 0
          ? `Moving lines ${movingLines.join(", ")} were inverted to form the resulting hexagram.`
          : sameHexagram
            ? "No moving lines were cast, so the resulting hexagram remains the same."
            : "The resulting hexagram was derived by inverting the moving lines."}
      </p>
      <div className="mt-5 space-y-5">
        {lines.length > 0 ? lines.map((line) => (
          <section
            key={line.heading}
            className="rounded-2xl bg-white px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
              {line.heading}
            </h4>
            <div className="mt-3 space-y-3 text-sm leading-7 text-stone-700">
              {line.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        )) : (
          <div className="rounded-2xl bg-white px-4 py-4 text-sm leading-7 text-stone-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            No moving lines were selected, so there are no resulting line texts to display.
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
        const lineClassName = isMoving ? "bg-amber-300" : "bg-stone-100";

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

function CompactSummary({
  title,
  subtitle,
  result,
}: {
  title: string;
  subtitle: string;
  result: InterpretationResult;
}) {
  return (
    <div className="rounded-[24px] border border-amber-300 bg-amber-50 p-4 transition">
      <p className="text-sm font-semibold text-stone-900">{title}</p>
      <p className="mt-1 text-xs leading-5 text-stone-600">{subtitle}</p>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">
        {result.hexagramNumber}
      </p>
      <p className="mt-1 text-sm text-stone-700">{result.hexagramName}</p>
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
