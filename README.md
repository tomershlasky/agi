# AGI — Agent Gibberish Intelligence

> No, not *that* AGI.

A [Claude Code](https://claude.com/claude-code) skill that turns keyboard
gibberish back into what you meant.

If you've ever started typing before your OS switched languages, you know the
problem. You meant to type `push` but the layout was still Hebrew, so what came
out was `פודי`. Each Hebrew letter sits on the same physical key as a Latin
letter (`p→פ, u→ו, s→ד, h→י`), so the fix is a deterministic one-to-one key
remapping — **not** translation.

AGI auto-detects that garbled Hebrew in your message and converts it back to the
English you meant, so Claude can just understand you.

```
פודי   →  push
```

It only goes one way — **Hebrew → English**. Normal English input is always left
exactly as-is.

## Why a skill (and not just translation)

The text isn't another language — it's the *right* word on the *wrong* keys.
Translating it makes no sense; remapping the physical keys recovers the exact
intended characters, every time, with zero guessing.

## How it works

- A dependency-free Node script (`scripts/agi.mjs`) holds the QWERTY ↔ Hebrew
  physical-key table and remaps Hebrew characters to the English key they sit on.
- The skill's `description` tells Claude to invoke it automatically whenever your
  message has garbled Hebrew — no command to remember.
- One direction only: Hebrew → English. English, digits, spaces, and punctuation
  pass through untouched, so running it on already-English text is a no-op.

## Install

Copy (or clone) the folder into your Claude Code skills directory:

```bash
git clone https://github.com/tomershlasky/agi ~/.claude/skills/agi
```

Or for a single project, drop it under `<project>/.claude/skills/agi`.
That's it — Claude picks it up automatically.

## Manual CLI usage

You can also run it directly:

```bash
node ~/.claude/skills/agi/scripts/agi.mjs "פודי"        # -> push
node ~/.claude/skills/agi/scripts/agi.mjs "פודי איט"    # -> push thy
echo "פודי" | node ~/.claude/skills/agi/scripts/agi.mjs  # reads stdin
```

## Adding another layout

The mapping lives in one place: the `EN_TO_HE` table in `scripts/agi.mjs`, with
the Hebrew→English inverse derived automatically. To support another source
layout (Russian ЙЦУКЕН, Arabic, etc.), add a sibling table and invert it the same
way. PRs welcome.

## License

MIT.
