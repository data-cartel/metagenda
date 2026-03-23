# Backlog

## High priority

- [ ] Review codebase and keep only useful code
- [ ] Design spec for what we want metagenda to be
- [ ] Update tech stack

## Test coverage

- [ ] Add test coverage
	- [x] Pick testing library (vitest)
	- [ ] Add unit tests for markdown parsing invariants (`md.ts`): roundtrip encode/decode, tag extraction, subtask inheritance
	- [ ] Add unit tests for task model utilities (`todo.ts`): priority ordering, urgency calculation, `splitLineOfWork`
	- [ ] Add unit tests for scheduling logic (`agenda.ts`): task selection, progress state transitions, subtask traversal
	- [ ] Add unit/integration tests for config loading and fallback behavior (`cfg.ts`): YAML parse, missing keys, `LineOfWorkCfgs` lookup
	- [ ] Add tests for review workflow (`review.ts`): completion prompts, git commit side-effects, journal generation
	- [ ] Add CI test job with coverage threshold (coverage >= 80%)

## Features

- [ ] Create a command for playing back multiple recordings
- [ ] Implement the review action for a given line of work
- [ ] Assert that markdown todos can be encoded to a string identical to raw
- [ ] Make `announceFx` delay value dynamic based on action
- [ ] Create an interactive task review/update process
- [ ] Automatically move done tasks below todos
- [ ] Create a daily template
- [ ] Show remaining time in `spamFx`
- [ ] Implement daily hooks that only run once a day based on presence of artifacts
- [ ] Voice over flow
- [ ] Find out how to switch focus between windows programmatically

## Refactoring

- [ ] Abstract away task source behind an interface (`agenda.ts`, `review.ts`)
- [ ] Extract `Notifier` interface from `announceFx` (`time.ts`)
- [ ] Extract `ProgressChecker` interface from `completionPromptFx` (`review.ts`)
- [ ] Replace conditional logic in `journalFx` with dependency injection (`review.ts`)
- [ ] Replace `while` loop with a recursive feedback loop

## Config

- [ ] Make `LineOfWorkCfgs` lookup fall back to less-qualified config paths (`cfg.ts`, `review.ts`)
- [ ] Use Effect's type-safe error handling for config file loading (`cfg.ts`)

## Observability

- [ ] Fix logs not getting added as events to traces
- [ ] Notify about recording starting/ending
- [ ] Working notification with `terminal-notifier`

## Obsidian

- [ ] Build an Obsidian plugin
- [ ] Generate `.canvas` graph of tracked todos

## Done

- [x] Use emacsclient for git in journal hook
- [x] Treat internal tags as if prefixed by file-level tasks
- [x] Allow daily note metadata `projects` list to also specify subtasks
- [x] Allow arbitrary subtask nesting
- [x] Use upcoming task notification code for breaks
- [x] Fix inline metadata setting
- [x] Add support for in-progress task state `- [/]`
- [x] Require no more than 2 runs before completion
- [x] One metagenda step at a time
- [x] Add a command for updating the profile pinned version
- [x] Create a command for interactively setting task ids
- [x] Move markdown-related code to a separate module
- [x] Show the task before the completion prompt
- [x] Refactor metagenda item step
- [x] Extend CLI to support non-zellij-based tasks
- [x] Deal with untracked vault files not getting searched
- [x] Prompt for commit messages and auto commit to git
- [x] Read all constants from a `.yaml` config file
- [x] Generalize breaks to arbitrary external todos
- [x] Bring back the OBS hook
- [x] Alert when OBS recording is about to end
- [x] Confirm the return from external tasks before starting hacking
- [x] Automatically commit changes in vault
- [x] Prompt whether the task has been completed after hacking
- [x] Make `spamFx` printing milliseconds delay configurable
- [x] Update global config values with what's set in the daily note
- [x] Set up strict linting
- [x] Set up directory structure automatically
- [x] Implement the user flow specified in the README
- [x] Move journals, backlogs, and recordings to vault
- [x] Set up a command line interface
- [x] Migrate `hack.sh`
- [x] Migrate `takeabreak.sh`
- [x] Migrate start/end timestamps
- [x] Package with Nix
- [x] Infer priorities from task order
- [x] Look at file-level tags when searching for tasks
- [x] List projects for the day in the daily note
- [x] Add support for subtasks
- [x] Take two top-level tasks and switch between before a longer break
- [x] Use Obsidian instead of emacs for planning and journaling
- [x] Automate the journaling step
- [x] Read steps from an external source instead of hard-coding them
- [x] Get task id / cast name from subtags
- [x] Deprecate project/zession specific journals
- [x] Search all vault files for tasks
- [x] Split `cli/src/main.ts` into modules
- [x] Automate commitment of changes to git
- [x] Use task name instead of the date to group/label data
- [x] Find a way to programmatically control OBS
- [x] Record journaling in OBS
- [x] Convert existing traces from `.jsonl` to `.csv`
