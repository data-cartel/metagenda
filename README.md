# metagenda

Autobiography as code. A CLI tool that orchestrates your daily workflow — scheduling tasks from an Obsidian vault, recording work sessions with asciinema, prompting for completion, and committing progress to git.

## How it works

1. Parse your daily note for timestamped tasks organized by lines of work
2. Select the current task based on schedule and progress state
3. Announce the task, then record a terminal session with asciinema
4. Prompt for completion, update task state, and commit changes to git
5. Optionally record video with OBS for later review

## CLI

```
metagenda              Run the main agenda loop (auto-select next task)
metagenda do <low>     Execute a specific line of work
metagenda plan <low>   Review/playback recordings for a line of work
metagenda todos        List all tasks (--flatten to unnest subtasks)
metagenda export       Export task spans from JSONL to CSV
metagenda cfg [path]   Show current configuration
```

## Configuration

Config lives at `~/.config/metagenda.yaml`:

```yaml
vaultPath: ~/vault

hack:
  minutes: 25
plan:
  minutes: 10
review:
  minutes: 10
afk:
  minutes: 5

spamSecs: 10
spamDelayMs: 8
obsEnabled: false
planPlaybackSpeed: 60
journalPlaybackSpeed: 12
```

Per-line-of-work settings (e.g. repo paths) go under `lineOfWork`.

## Task format

Tasks are standard markdown checkboxes in your Obsidian vault daily notes:

```markdown
- [ ] 09:00 - 11:00 Implement auth flow #project/backend
- [/] 11:00 - 11:15 Take a break
- [x] 14:00 - 16:00 Deploy pipeline #infra
```

Progress states: `[ ]` todo, `[/]` doing, `[x]` done, `[!]` overrun.

## Tech stack

- TypeScript + [Effect](https://effect.website) for the core logic
- Obsidian vault as the task source (markdown with dataview metadata)
- asciinema for terminal session recording
- OBS (via obs-cmd) for optional video capture
- OpenTelemetry for tracing task execution
- Nix for packaging and dev environment

## Setup

```bash
nix develop            # enter dev shell with all dependencies
npm run build          # compile TypeScript
npm test               # run tests
npm run verify         # build + lint + test
```

The Nix flake also exposes `metagenda` as an app:

```bash
nix run .#metagenda -- --help
```
