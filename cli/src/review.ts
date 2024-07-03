import * as platform from "@effect/platform"
import { Effect, Option, Duration, Match } from "effect"

import { Project, cfgFx } from "./cfg"
import { $, std, sh, reposPath, vaultPath } from "./sys"
import { playbackFx } from "./cast"
import { announceFx } from "./time"
import { LineOfWork, Progress, Todo, fmtLineOfWork } from "./todo"
import { Fromd, updMdFx } from "./md"

const completionPromptFx = (task: string) =>
    Effect.gen(function* (_) {
        const { display, readInput } = yield* _(platform.Terminal.Terminal)
        console.clear()
        yield* _(display(task))

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while (true) {
            yield* _(display("\nHas the task been completed? [y/n] "))
            const { input: answer } = yield* _(readInput)
            yield* _(display("\n"))

            if (Option.contains("y")(answer)) return true
            if (Option.contains("n")(answer)) return false
        }
    })

export const planFx = (lineOfWork: LineOfWork) =>
    Effect.gen(function* () {
        // yield* obsidianFx(`backlog/${lineOfWork.project}`)
        const cfg = yield* cfgFx

        yield* playbackFx(lineOfWork, cfg.planPlaybackSpeed)
    }).pipe(Effect.withSpan(`plan #${fmtLineOfWork(lineOfWork)}`))

const repoPath = (project: Project) =>
    Match.value(project).pipe(
        Match.when("x23.ai", () => `${reposPath}/x23.ai/aggregator`),
        Match.when("solanalysis", () => `${reposPath}/data-cartel/solanalysis`),
        Match.orElse(() => `${reposPath}/${project}`),
    )

export const journalFx = (todo: Todo, fromd?: Fromd) =>
    Effect.gen(function* (_) {
        const cfg = yield* cfgFx

        if (!fromd) {
            if (todo.action === ("hack" as const) && todo.lineOfWork)
                yield* playbackFx(todo.lineOfWork, cfg.journalPlaybackSpeed)

            console.clear()
            const { display, readInput } = yield* _(platform.Terminal.Terminal)
            yield* _(display("Press any key to continue..."))
            yield* _(readInput)

            return
        }

        const done = yield* completionPromptFx(fromd.raw)
        const progress = Match.value({ before: todo.progress, done }).pipe(
            Match.when({ done: true }, () => "done" as Progress),
            Match.when({ before: "done" }, () => "doing" as Progress),
            Match.when({ before: "doing" }, () => "overrun" as Progress),
            Match.when({ before: "todo" }, () => "doing" as Progress),
            Match.when({ before: "overrun" }, () => "overrun" as Progress),
            Match.exhaustive,
        )

        yield* updMdFx({ ...todo, progress, fromd })

        const date = new Date()
        const msg = date.toISOString()
        yield* $(`git -C ${vaultPath} add .`).pipe(std)
        yield* $(`git -C ${vaultPath} commit -m ${msg}`).pipe(std)
        yield* $(`git -C ${vaultPath} show HEAD`).pipe(std)

        if (todo.action === ("hack" as const)) {
            if (progress === "done") {
                if (todo.lineOfWork) {
                    const { project } = todo.lineOfWork

                    console.clear()
                    yield* $(`git -C ${repoPath(project)} add .`).pipe(std)
                    yield* $(`git -C ${repoPath(project)} status`).pipe(std)

                    yield* $(
                        `git -C ${repoPath(project)} commit`, // -m '${commitMsg.trim()}'`,
                    ).pipe(std)
                    yield* $(`git -C ${repoPath(project)} show HEAD`).pipe(std)
                }

                if (cfg.obsEnabled) {
                    yield* announceFx(
                        Duration.seconds(cfg.spamSecs),
                        `Get ready to film a review of '${todo.description}'`,
                    )
                    yield* sh("obs-cmd recording start")
                }

                yield* playbackFx(todo.lineOfWork, cfg.journalPlaybackSpeed)

                if (cfg.obsEnabled) {
                    yield* announceFx(
                        Duration.seconds(cfg.spamSecs),
                        "OBS is about to stop recording",
                    )
                    yield* sh("obs-cmd recording stop")
                }
            } else {
                yield* playbackFx(todo.lineOfWork, cfg.journalPlaybackSpeed * 4)
            }
        }

        // yield* $(`${__dirname}/../magit.sh ${repoPath}`).pipe(std)
    }).pipe(Effect.withSpan(todo.description))

export const obsRecStartFx = sh("obs-cmd recording start")
export const obsRecStoptFx = sh("obs-cmd recording stop")
