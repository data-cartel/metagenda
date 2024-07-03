- [ ] Prioritize the metagenda backlog
- [ ] Generate `.canvas` graph representing metagenda tracked todos #obsidian
- [ ] Automate the morning routine
    - [ ] Set up `nixpkgs#spotify-player`
    - [ ] Automate playing songs from Spotify
    - [ ] Schedule songs to be played in the morning
- [ ] Set up home manager
- [ ] Integrate DVC for data management
- [x] Use `exec emacsclient -nw -c --eval "(progn (magit-status) (delete-other-windows))"` instead of vanilla `git` commands in the journal hook [priority:: highest] [completion:: 2024-06-16]
- [x] Treat internal tags as if prefixed by file-level tasks #metagenda/obsidian [completion:: 2024-06-17]
- [x] Allow daily note metadata `projects` list to also specify subtasks #obsidian [completion:: 2024-06-17]
- [x] Allow arbitrary subtask nesting #obsidian [completion:: 2024-06-17]
- [x] Use the new upcoming task notification code for breaks #cli [completion:: 2024-06-20]

### `cli`

- [x] Fix inline metadata setting #cli/inline-fix
- [x] Fix inline metadata setting #cli/inline-fix
- [x] Add support for in-progress task state `- [/]` #cli/task-state
- [x] Require no more than 2 runs before completion #cli/time
- [x] One metagenda step at a time #cli/step
- [x] Add a command for updating the profile pinned version of metagenda #cli/meta
- [x] Create a command for interactively setting task ids #cli/task-ids
- [x] Move markdown-related code to a separate module #cli/md [id:: md.ts]
- [x] Show the task before the completion prompt #cli
- [x] Refactor metagenda item step #cli/refactor-step
- [x] Figure out what's the 2024 js testing library #cli/tests
- [!] Add test coverage #cli/tests
- [!] Create a command for playing back multiple recordings #cli/review/playback
- [ ] Implement the review action for a given line of work #cli/review
- [ ] Assert that markdown todos can be encoded to a string identical to raw #cli/md/serde
- [ ] Make `announceFx` delay value dynamic based on action #cli/action
- [ ] Create an interactive task review/update process #cli/interactive

- [ ] Fix logs not getting added as events to traces
- [ ] Automatically move done tasks below todos
- [ ] Create a daily template
- [ ] Notify about recording starting/ending
- [ ] Show remaining time in `spamFx`
- [ ] Implement daily hooks that only run once a day based on presence of artifacts
- [ ] Working notification with `terminal-notifier`
- [ ] Apple Calendar integration
- [ ] GitHub Projects integration
    - [ ] Load tasks from GitHub Projects using the [classic API](https://docs.github.com/en/rest/projects?apiVersion=2022-11-28)
- [ ] Voice over flow
- [ ] Add a recursive feedback loop to the CLI instead of having a `while` loop
- [ ] Find out how to switch focus between windows programmatically
- [ ] Make runtime Nix deps work globally
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


- [ ] Turn metagenda into a systemd service #cli
```nix
systemd.services.irc = {
    serviceConfig = {
        Type = "simple";
        User = "oatman";
        ExecStart = "screen -dmS irc irssi";
        ExecStop = "screen -S irc -X quit";
    };
    wantedBy = ["multi-user.target"];
};
```


---

### `videauto`

- [ ] Use [auto-editor](https://github.com/WyattBlue/auto-editor) to split footage into clips in a Premiere Pro project #videauto/editor [id:: auto-editor]
- [ ] Add a command for watching video files #videauto
- [ ] Add a command for opening Premiere Pro projects #videauto

---

###  `brave extension`

- [ ] Figure out how to control tabs through an extension #extension/tab-control
- [ ] Force breaks by hiding content
- [ ] Open/close tabs based on workflow
	- [ ] `"host_permissions": [ "https://developer.chrome.com/*" ]`

---

### `telegram integration`

- [ ] Set up Telegram CLI `nixpkgs#tg`
- [ ] Create a Telegram bot

---

### `analytics`

- [x] Add an example `chart.js` to the web app as a React component #analytics [completion:: 2024-06-20]
- [x] Load trace data in the web app and visualize it #analytics/viz
- [ ] Calculate total tracked minutes per day and plot the chart in the web app #analytics
- [ ] Calculate total tasks done per day and plot the chart in the web app #analytics
- [ ] Calculate time usage per `zession` and untracked time #analytics
- [ ] Ranking-based multi-dimensional scoring system
    - [ ] Task outcome value
    - [ ] Task effort estimate
    - [ ] Task dependency graph
    - [ ] Task similarity score
- [ ] Budgeting

---

### `infra`

- [ ] Set up a GCP deployment with Terraform

---

## Archive

### `init`

- [x] will simplify the basic setup i have going on rn
- [x] implement the user flow specified in the `README`
- [x] placeholder web UI
- [x] ASCIInema web player with ability to play a sequence of casts
- [x] Move journals, backlogs, and recordings to `vault` [scheduled:: 2024-06-08]

---

### `*.sh ~> *.ts`

- [x] Set up a command line interface
- [x] Migrate `hack.sh`
	- [x] Migrate hacking launcher
	- [x] Migrate hacking timeouts
	- [x] Migrate planning step
	- [x] Migrate playback step
	- [x] Migrate journaling step
- [x] Migrate `takeabreak.sh` [scheduled:: 2024-06-09] [completion:: 2024-06-09]
	- [x] Implement the infinite printing loop [completion:: 2024-06-09]
	- [x] Terminate the loop when the break is over [completion:: 2024-06-09]
- [x] Migrate start/end timestamps [scheduled:: 2024-06-09] [completion:: 2024-06-09]
	- [x] Add spans [completion:: 2024-06-09]
	- [x] Print spans to console [completion:: 2024-06-09]
	- [x] Dump logs to a file [completion:: 2024-06-09]
- [x] Package with Nix [scheduled:: 2024-06-09]  [completion:: 2024-06-09]

---

- [x] Infer priorities from task order once handling all prioritized tasks #metagenda/priorderies [priority:: high] [completion:: 2024-06-16]
- [x] Look at file-level tags when searching for tasks #metagenda [completion:: 2024-06-16]
- [x] List projects for the day in the daily note and use that to determine which tasks to include in each iteration [task:: projects-for-the-day] [completion:: 2024-06-16]
- [x] Add support for subtasks #metagenda [priority:: highest] [completion:: 2024-06-16]
	- [x] Check that this shows up #metagenda [priority:: high] [completion:: 2024-06-16]
	- [x] Make `zession` inherited from the top-level task [completion:: 2024-06-16]
- [x] Take two top-level tasks and switch between before a longer break #metagenda [priority:: highest] [completion:: 2024-06-16]
- [x] Use Obsidian instead of emacs for planning and journaling [on:: 2024-06-09]
- [x] Automate the journaling step [completion:: 2024-06-11]
	- [x] Dump traces to a json file [completion:: 2024-06-09]
	- [x] Dump traces into daily md file [completion:: 2024-06-11]
- [x] Read steps from an external source instead of hard-coding them [completion:: 2024-06-16]
	- [x] From `agenda.jsonl` [completion:: 2024-06-11]
	- [x] From markdown tasks and dataview metadata attributes [completion:: 2024-06-16]
- [x] Get task id / cast name from subtags, e.g. `metagenda/subtags` instead of #metagenda/subtags [priority:: highest] [cast:: subtags] [completion:: 2024-06-16]
- [x] Deprecate project/zession specific journals #metagenda [priority:: 4] [completion:: 2024-06-16]
- [x] Search all vault files for tasks [completion:: 2024-06-16]
- [x] Split `cli/src/main.ts` into modules #metagenda [completion:: 2024-06-16]
- [x] Automate commitment of changes to `git` #metagenda/autogit [priority:: highest] [completion:: 2024-06-16]
- [x] Use task name instead of the date to group/label data when one is provided [scheduled:: 2024-06-10]  [completion:: 2024-06-16]
- [x] Find a way to programmatically control OBS - `obs-cmd`
- [x] Record journaling in OBS [completion:: 2024-06-09]
- [x] Convert existing traces from `.jsonl` to `.csv` [completion:: 2024-06-17]
- [x] Setup a hello world extension [on:: 2024-06-09]
