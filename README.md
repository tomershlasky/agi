<div align="center">

# AGI

**Agent Gibberish Intelligence**

*The one that actually shipped.*

[![License: MIT](https://img.shields.io/badge/license-MIT-2563eb.svg)](LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-0-22c55e.svg)](scripts/agi.mjs)
[![AGI](https://img.shields.io/badge/AGI-achieved%20%E2%9C%85-22c55e.svg)](#how-it-works)

</div>

---

```text
you typed:    עןא פודי איק כןרדא םמק
your agent:   …sorry, I'm not sure what you mean. Could you rephrase?
with AGI:     git push the first one          ✓  on it.
```

You meant `git push the first one`. Your keyboard was still in Hebrew. So your
coding agent got `עןא פודי איק כןרדא םמק` — not a typo, a full wall of nonsense —
and did what agents do: took you seriously, tried anyway, confidently, wrongly.

That's the uniquely modern version of this papercut. A search box just sits there
looking broken and your eye catches it in half a second. An agent *commits by
default* — enter sends — and then burns three seconds hallucinating an answer to a
question you never asked, or politely asks **you** to clarify, as if the garbage
were your fault. The smarter the agent, the faster it runs off the cliff with your
input.

So you do the ritual: select-all, delete, `Cmd+Space`, retype the whole paragraph
you already wrote once. Four, six, ten times a day. Every time, it snaps the thread
of thought you were holding.

**AGI ends the ritual.** It reverses the layout before the agent ever sees it —
same keystrokes, right alphabet, understood the first time.

> We solved the alignment problem. The keyboard one.

## Why this happens

Hebrew is a different alphabet on the *same physical keys*. Type English while the
layout is still Hebrew and every letter lands on its Hebrew neighbor:

```text
p → פ     u → ו     s → ד     h → י        →   "push" becomes "פודי"
```

It isn't another language and it isn't a typo — it's the *right* word on the
*wrong* keys. So the fix isn't translation, it's a deterministic remap. No model,
no guessing, no "AI." (The name is a joke. The other AGI is still a roadmap; this
one's a single file.)

## Install

It's a [Claude Code](https://claude.com/claude-code) skill. Drop it in and Claude
invokes it on its own the moment your message turns to gibberish:

```bash
git clone https://github.com/tomershlasky/agi ~/.claude/skills/agi
```

Per-project instead of global? Put it under `<your-repo>/.claude/skills/agi`.
No build, no dependencies, no config. It also runs as a plain CLI in any agent or
shell that can call `node`.

## Usage

```bash
node scripts/agi.mjs "פודי"                     # → push
node scripts/agi.mjs "עןא פודי"                  # → git push
node scripts/agi.mjs "עןא פודי איק כןרדא םמק"     # → git push the first one
echo "פודי" | node scripts/agi.mjs               # reads stdin
```

> [!NOTE]
> One direction only: **Hebrew layout → English.** Real English passes straight
> through untouched, and genuine Hebrew is left alone — it's a real word, not a
> mistyped English one. AGI un-scrambles; it doesn't translate.

<details>
<summary><b>How it works</b></summary>

<br>

A single dependency-free Node script holds the QWERTY ↔ Hebrew physical-key table
and remaps each Hebrew character back to the English key it sits on. The mapping
lives in exactly one place — the `EN_TO_HE` table in `scripts/agi.mjs` — and the
Hebrew→English inverse is derived from it automatically.

Want another source layout (Russian ЙЦУКЕН, Arabic, Greek…)? Add a sibling table
and invert it the same way. **PRs welcome.**

</details>

## License

[MIT](LICENSE) © Tomer Shlasky

<div align="center"><sub>Real AGI. Ships today. Works in Hebrew.</sub></div>
