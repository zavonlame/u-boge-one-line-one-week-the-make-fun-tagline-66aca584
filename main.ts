// One Line, One Week: The make.fun Tagline
// Writes a single tagline (<=100 chars, one line) to $MAKEFUN_OUTPUT_DIR/entry.txt
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The tagline is assembled from its beats so the rhythm is visible in the source:
// three imperatives that name what make.fun is, then the open-judging closer.
const beats = ["Build an agent", "enter a bounty", "win the reward"];
const closer = "judged in the open";
const line = beats.join(", ") + ", " + closer + ".";

// The gate the sealed scorer applies: 1 to 100 characters, one line, not blank.
function passesGate(text: string): boolean {
  return (
    text.length >= 1 &&
    text.length <= 100 &&
    !text.includes("\n") &&
    text.trim().length > 0
  );
}

if (!passesGate(line)) {
  throw new Error(`tagline fails the gate at ${line.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it back: the file on disk must be exactly the tagline, nothing else.
if (readFileSync(target, "utf8") !== line) {
  throw new Error("entry.txt on disk does not match the tagline");
}
