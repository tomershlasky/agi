#!/usr/bin/env node
// AGI — Agent Gibberish Interceptor.
// Converts text typed on a Hebrew keyboard layout back to the English it was meant
// to be. Deterministic physical-key remapping (NOT translation). Zero dependencies.
// One direction only: Hebrew -> English. English (and anything not on the Hebrew
// table) passes through untouched.
//
// Usage:
//   node agi.mjs "פודי"           -> push
//   node agi.mjs "פודי איט"        -> push thy   (spaces preserved)
//   echo "פודי" | node agi.mjs                   (reads stdin if no args)

// Source of truth: physical QWERTY key -> standard Israeli Hebrew character.
const EN_TO_HE = {
  q: "/", w: "'", e: "ק", r: "ר", t: "א", y: "ט", u: "ו", i: "ן", o: "ם", p: "פ",
  a: "ש", s: "ד", d: "ג", f: "כ", g: "ע", h: "י", j: "ח", k: "ל", l: "ך", ";": "ף", "'": ",",
  z: "ז", x: "ס", c: "ב", v: "ה", b: "נ", n: "מ", m: "צ", ",": "ת", ".": "ץ", "/": ".",
};

// We only ever go Hebrew -> English, so invert the table once.
const HE_TO_EN = Object.fromEntries(
  Object.entries(EN_TO_HE).map(([en, he]) => [he, en])
);

function fixLayout(text) {
  // Hebrew chars get remapped to their physical key; everything else (English,
  // digits, spaces, punctuation) is left exactly as-is.
  return Array.from(text).map((ch) => HE_TO_EN[ch] ?? ch).join("");
}

// CLI ------------------------------------------------------------------------
function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

async function main() {
  let text = process.argv.slice(2).join(" ");
  if (!text && !process.stdin.isTTY) {
    text = (await readStdin()).replace(/\n$/, "");
  }
  if (!text) {
    process.stderr.write('agi: no input.\nUsage: node agi.mjs "<text>"\n');
    process.exit(1);
  }
  process.stdout.write(fixLayout(text) + "\n");
}

main();
