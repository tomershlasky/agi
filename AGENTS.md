# AGENTS.md

This repo ships **AGI — Agent Gibberish Interceptor**: a zero-dependency tool that
un-scrambles text typed on a **Hebrew keyboard layout** when English was meant
(e.g. `עןא פודי` → `git push`). It's a deterministic physical-key remap, not
translation.

## When to use it

If a user's message contains garbled Hebrew that doesn't form real Hebrew words —
English typed while the OS was still on a Hebrew layout (e.g. `פודי` = `push`) —
recover the intended text **before** acting on the message.

## How

```bash
node ~/.claude/skills/agi/scripts/agi.mjs "<the garbled text>"
```

Treat the output as the user's actual message, then respond. It only converts
Hebrew-layout gibberish to English — real English, digits, punctuation, and genuine
Hebrew pass through unchanged, so running it on normal input is a no-op.

## Wiring it into your own project

Clone AGI anywhere, then paste the snippet above into your project's `AGENTS.md`
(or your agent's instruction file) and point the path at your copy of `agi.mjs`.
