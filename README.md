<div align="center">

# 🧠 AGI

### The real AGI is finally here.

**Agent Gibberish Intelligence** — turns keyboard gibberish back into what you
actually meant.

*They spent billions chasing Artificial General Intelligence. We shipped* ***Agent
Gibberish Intelligence*** *instead. You're welcome.*

<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-2563eb.svg)](LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-0-22c55e.svg)](scripts/agi.mjs)
[![Built for Claude Code](https://img.shields.io/badge/built%20for-Claude%20Code-d97757.svg)](https://claude.com/claude-code)
[![Hebrew → English](https://img.shields.io/badge/%D7%A4%D7%95%D7%93%D7%99-push-8b5cf6.svg)](#the-bit)
[![AGI achieved](https://img.shields.io/badge/AGI-achieved%20%E2%9C%85-22c55e.svg)](#faq)

</div>

---

## <a name="the-bit"></a>The bit

You start typing before your OS finishes switching keyboards. You meant `push`.
Your layout was still Hebrew. Out came `פודי`.

```text
   what you typed        what you meant
   ─────────────         ──────────────
       פודי        ──▶        push
```

It's not a typo and it's not another language — every Hebrew letter sits on the
**same physical key** as a Latin one (`p→פ  u→ו  s→ד  h→י`). So the fix isn't
translation, it's a deterministic key remap. AGI does it automatically, so Claude
just understands you.

```bash
$ echo "עןא פודי" | node scripts/agi.mjs
git push
```

## When tiny words go very wrong

The fun part: sometimes your gibberish isn't gibberish at all — it's a *real
Hebrew word*, just not the one you wanted. You fire off a two-letter reply and
accidentally summon something.

| You typed | You **meant** | …but in Hebrew that's a real word meaning |
| :-------: | :-----------: | ----------------------------------------- |
|   `דם`    |     `so`      | **blood** 🩸                              |
|   `שד`    |     `as`      | **a demon** 👹                            |
|   `אם`    |     `to`      | **mom** (or "if")                         |
|   `עם`    |     `go`      | **a nation** (or "with")                  |
|   `גם`    |     `do`      | **also**                                  |
|  `ישיש`   |    `haha`     | **an old man** 👴                         |

> So you laugh `haha` at your colleague and send them `ישיש` — "an old man."
> You reply `so` and send `דם` — "blood." AGI quietly undoes all of it.

*(All six round-trip through `agi.mjs` exactly as shown.)*

## Table of contents

- [Install](#install)
- [How it works](#how-it-works)
- [CLI usage](#cli-usage)
- [Adding another layout](#adding-another-layout)
- [FAQ](#faq)
- [License](#license)

## Install

It's a [Claude Code](https://claude.com/claude-code) skill. Drop it into your
skills directory and Claude picks it up automatically:

```bash
git clone https://github.com/tomershlasky/agi ~/.claude/skills/agi
```

Per-project instead of global? Put it under `<your-repo>/.claude/skills/agi`.

That's the whole install. No build, no dependencies, no config.

## How it works

- A single dependency-free Node script (`scripts/agi.mjs`) holds the
  QWERTY ↔ Hebrew physical-key table and remaps each Hebrew character to the
  English key it sits on.
- The skill's `description` tells Claude to invoke AGI automatically whenever
  your message contains garbled Hebrew — nothing to remember, nothing to type.
- **One direction only: Hebrew → English.** Real English, digits, spaces, and
  punctuation pass straight through, so running it on normal text is a no-op.

## CLI usage

You can also run it straight from the terminal:

```bash
node ~/.claude/skills/agi/scripts/agi.mjs "פודי"        # → push
node ~/.claude/skills/agi/scripts/agi.mjs "עןא פודי"    # → git push
echo "פודי" | node ~/.claude/skills/agi/scripts/agi.mjs  # reads stdin
```

## Adding another layout

The mapping lives in exactly one place — the `EN_TO_HE` table in
`scripts/agi.mjs` — and the Hebrew→English inverse is derived from it
automatically. To support another source layout (Russian ЙЦУКЕН, Arabic, Greek…),
add a sibling table and invert it the same way. **PRs welcome.**

## FAQ

**Is this real AGI?**
Yes — *the* real AGI. Agent Gibberish Intelligence: shipped, working, sitting in
your terminal right now. Artificial General Intelligence is still loading.

**Will it translate actual Hebrew for me?**
Also no — by design. AGI only un-scrambles wrong-layout text. Genuine Hebrew is a
real word, not a mistyped English one, and it's left untouched.

**Does it touch my normal English?**
Never. English in, same English out.

## License

[MIT](LICENSE) © Tomer Shlasky
