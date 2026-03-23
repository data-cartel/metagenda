# Roadmap

## Overrun

- [!] Add test coverage #cli/tests
- [!] Create a command for playing back multiple recordings #cli/review/playback

## Refactoring

- [ ] Abstract away task source behind an interface (`agenda.ts`, `review.ts`) #cli/refactor
- [ ] Extract `Notifier` interface from `announceFx` (`time.ts`) #cli/refactor
- [ ] Extract `ProgressChecker` interface from `completionPromptFx` (`review.ts`) #cli/refactor
- [ ] Replace conditional logic in `journalFx` with dependency injection (`review.ts`) #cli/refactor
- [ ] Add a recursive feedback loop to the CLI instead of having a `while` loop

## Config

- [ ] Make `LineOfWorkCfgs` lookup fall back to less-qualified config paths (`cfg.ts`, `review.ts`) #cli/cfg
- [ ] Use Effect's type-safe error handling for config file loading (`cfg.ts`) #cli/cfg

## Features

- [ ] Implement the review action for a given line of work #cli/review
- [ ] Assert that markdown todos can be encoded to a string identical to raw #cli/md/serde
- [ ] Make `announceFx` delay value dynamic based on action #cli/action
- [ ] Create an interactive task review/update process #cli/interactive
- [ ] Automatically move done tasks below todos
- [ ] Create a daily template
- [ ] Show remaining time in `spamFx`
- [ ] Implement daily hooks that only run once a day based on presence of artifacts
- [ ] Voice over flow
- [ ] Find out how to switch focus between windows programmatically

## Observability

- [ ] Fix logs not getting added as events to traces
- [ ] Notify about recording starting/ending
- [ ] Working notification with `terminal-notifier`

## Obsidian

- [ ] Build an Obsidian plugin #obsidian [priority:: low]
- [ ] Generate `.canvas` graph representing metagenda tracked todos #obsidian [priority:: lowest]

## Done

- [x] Use `exec emacsclient -nw -c --eval "(progn (magit-status) (delete-other-windows))"` instead of vanilla `git` commands in the journal hook [completion:: 2024-06-16]
- [x] Treat internal tags as if prefixed by file-level tasks #metagenda/obsidian [completion:: 2024-06-17]
- [x] Allow daily note metadata `projects` list to also specify subtasks #obsidian [completion:: 2024-06-17]
- [x] Allow arbitrary subtask nesting #obsidian [completion:: 2024-06-17]
- [x] Use the new upcoming task notification code for breaks #cli [completion:: 2024-06-20]
- [x] Fix inline metadata setting #cli/inline-fix
- [x] Add support for in-progress task state `- [/]` #cli/task-state
- [x] Require no more than 2 runs before completion #cli/time
- [x] One metagenda step at a time #cli/step
- [x] Add a command for updating the profile pinned version of metagenda #cli/meta
- [x] Create a command for interactively setting task ids #cli/task-ids
- [x] Move markdown-related code to a separate module #cli/md
- [x] Show the task before the completion prompt #cli
- [x] Refactor metagenda item step #cli/refactor-step
- [x] Figure out what's the 2024 js testing library #cli/tests
- [x] Extend CLI to support non zellij-based tasks [completion:: 2024-06-21]
- [x] Deal with untracked vault files not getting searched [completion:: 2024-06-21]
- [x] Prompt for commit messages and auto commit to git #cli [completion:: 2024-06-20]
- [x] Read all constants from a `.yaml` config file #cli [completion:: 2024-06-20]
- [x] Read all constants from `cfg.md` config file #cli [completion:: 2024-06-20]
- [x] Generalize breaks to arbitrary external todos #cli [completion:: 2024-06-20]
- [x] Bring back the OBS hook #cli [completion:: 2024-06-20]
- [x] Alert when OBS recording is about to end and remove Obsidian from journaling #cli [completion:: 2024-06-20]
- [x] Confirm the return from external tasks before starting hacking #cli/interactive [completion:: 2024-06-20]
- [x] Automatically commit changes in `vault` #cli/git [completion:: 2024-06-20]
- [x] Prompt whether the task has been completed after hacking #cli/interactive
- [x] Make `spamFx` printing milliseconds delay configurable #cli/cfg
- [x] Update global config values with what's set in the daily note #cli/cfg
- [x] Set up strict linting and make it happy #metagenda/linter [completion:: 2024-06-16]
- [x] Set up directory structure automatically [completion:: 2024-06-17]
- [x] Simplify the basic setup
- [x] Implement the user flow specified in the `README`
- [x] Placeholder web UI
- [x] ASCIInema web player with ability to play a sequence of casts
- [x] Move journals, backlogs, and recordings to `vault` [completion:: 2024-06-08]
- [x] Set up a command line interface
- [x] Migrate `hack.sh`
- [x] Migrate `takeabreak.sh` [completion:: 2024-06-09]
- [x] Migrate start/end timestamps [completion:: 2024-06-09]
- [x] Package with Nix [completion:: 2024-06-09]
- [x] Infer priorities from task order once handling all prioritized tasks [completion:: 2024-06-16]
- [x] Look at file-level tags when searching for tasks [completion:: 2024-06-16]
- [x] List projects for the day in the daily note [completion:: 2024-06-16]
- [x] Add support for subtasks [completion:: 2024-06-16]
- [x] Take two top-level tasks and switch between before a longer break [completion:: 2024-06-16]
- [x] Use Obsidian instead of emacs for planning and journaling [completion:: 2024-06-09]
- [x] Automate the journaling step [completion:: 2024-06-11]
- [x] Read steps from an external source instead of hard-coding them [completion:: 2024-06-16]
- [x] Get task id / cast name from subtags [completion:: 2024-06-16]
- [x] Deprecate project/zession specific journals [completion:: 2024-06-16]
- [x] Search all vault files for tasks [completion:: 2024-06-16]
- [x] Split `cli/src/main.ts` into modules [completion:: 2024-06-16]
- [x] Automate commitment of changes to `git` [completion:: 2024-06-16]
- [x] Use task name instead of the date to group/label data [completion:: 2024-06-16]
- [x] Find a way to programmatically control OBS - `obs-cmd`
- [x] Record journaling in OBS [completion:: 2024-06-09]
- [x] Convert existing traces from `.jsonl` to `.csv` [completion:: 2024-06-17]
