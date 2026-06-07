# GEMINI.md

**AGI — Agent Gibberish Interceptor**: un-scrambles text typed on a Hebrew keyboard
layout when English was meant (e.g. `עןא פודי` → `git push`). Deterministic
physical-key remap, not translation.

When a user's message contains garbled Hebrew that isn't a real Hebrew word
(English typed on a Hebrew layout, e.g. `פודי` = `push`), recover it before acting:

```bash
node ~/.claude/skills/agi/scripts/agi.mjs "<the garbled text>"
```

Use the output as the user's real message. Real English and genuine Hebrew pass
through unchanged, so it's a no-op on normal input.
