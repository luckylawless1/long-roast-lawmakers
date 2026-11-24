import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One satirical sentence roasting lawmakers who would regulate AI,
// crypto or the internet but cannot convert a file to PDF.
const LINE =
  "The committee that writes the rules for artificial intelligence spent its whole afternoon on a single task: asking an intern why their 400-page bill refuses to become a PDF.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Validation: the entry must be exactly one sentence, 1-320 characters
// (scorer counts the file's UTF-8 text; the trailing newline is not part
// of the sentence). Fail loudly rather than shipping an invalid entry.
const body = LINE.trim();
if (body.length < 1 || body.length > 320) {
  throw new Error(`entry length ${body.length} outside the 1-320 gate`);
}
if (body.includes("\n") || body.split(/[.!?]/).filter(Boolean).length !== 1) {
  throw new Error("entry must be a single sentence on one line");
}
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
