---
name: agi
description: Use when the user's message contains garbled Hebrew characters that don't form real Hebrew words — text typed on a Hebrew keyboard layout when English was meant (like פודי, which is "push" typed on a Hebrew layout). Converts that Hebrew-layout text back to the English it was meant to be. Not for translating genuine Hebrew text, and it never touches normal English input.
version: 1.0.0
user-invocable: true
license: MIT
allowed-tools:
  - Bash(node *agi.mjs*)
---

# AGI — Agent Gibberish Intelligence

Fixes text that was typed with the OS still set to the Hebrew keyboard layout
when English was meant. Each Hebrew character sits on the same physical key as a
Latin character, so `פודי` is literally the keys `p u s h` — the user meant
**"push"**. This is a deterministic key remapping, **not** translation, and it
goes one way only: **Hebrew → English**.

## When this applies

The user's message contains Hebrew characters that don't read as real Hebrew
words — gibberish that's actually an English word typed on the wrong layout.

This skill does **not** apply when:
- The text is genuine, readable Hebrew → that's a translation task, not this.
- The text is normal English → it's already fine; leave it alone. The script
  passes English (and digits, spaces, punctuation) through untouched anyway.

## Flow

1. **Detect** — spot the garbled Hebrew segment(s) in the message.
2. **Convert** — run the script on the garbled text:
   ```bash
   node ~/.claude/skills/agi/scripts/agi.mjs "<garbled text>"
   ```
   It always converts Hebrew characters to their physical English key and leaves
   everything else as-is.
3. **Interpret & confirm** — show the converted text, state how you read the
   intended message, then answer the actual request.
4. **Don't force a guess** — if the converted output still isn't sensible, say so
   plainly and ask the user to retype, rather than answering a wrong guess.

## Example

| Input    | Converts to | Meaning                      |
|----------|-------------|------------------------------|
| `פודי`   | `push`      | Hebrew layout, meant English |
