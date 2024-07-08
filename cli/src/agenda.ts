import { Effect, Duration } from "effect"

import { inLineWith, Progress } from "./todo"
import { announceFx, fmtDate } from "./time"
import { obsidianFx } from "./sys"
import { journalFx } from "./review"
import { MdTodo, doFx, exeFx, vaultodosFx, updMdFx, fileTodosFx } from "./md"
import { cfgFx } from "./cfg"

// TODO: abstract away task source
export const metagendaFx = (dryRun: boolean) =>
    Effect.gen(function* () {
        const exe = exeFx(dryRun)

        const { vaultPath } = yield* cfgFx()
        const now = new Date()
        const tododay = yield* fileTodosFx(
            process.title.includes("vitest")
                ? `${__dirname}/../test/daily.md`
                : `${vaultPath}/daily/${fmtDate(now)}.md`,
        )

        const daily = tododay.filter(({ progress }) => progress !== "done")

        const current = daily.find(
            ({ startTime, endTime }) =>
                startTime &&
                endTime &&
                new Date(startTime) < new Date() &&
                new Date() < new Date(endTime),
        )

        if (current) {
            yield* exe(doFx)(current, current.fromd)
            return
        }

        let agendaItem: MdTodo
        const indexCurrent = daily
            .map(({ progress }) => progress)
            .indexOf("doing")
        if (indexCurrent !== -1) {
            const current = {
                ...daily[indexCurrent],
                progress: "todo" as Progress,
            }
            const next = {
                ...daily[
                    daily.length > indexCurrent + 1 ? indexCurrent + 1 : 0
                ],
                progress: "doing" as Progress,
            }

            yield* exe(updMdFx)(current)
            yield* exe(updMdFx)(next)

            agendaItem = next
        } else {
            const first = { ...daily[0], progress: "doing" as Progress }
            yield* exe(updMdFx)(first)

            agendaItem = first
        }

        const { action, lineOfWork } = agendaItem

        let todo: MdTodo
        if (!lineOfWork && action === "afk") {
            todo = { ...agendaItem, action, dryRun }
        } else {
            const todos = yield* vaultodosFx(
                ({ progress, lineOfWork: loW, fromd }) =>
                    progress !== "done" &&
                    inLineWith(lineOfWork)(loW) &&
                    !fromd.path.startsWith(`${vaultPath}/daily`),
            )

            todo = todos[0]

            if (todo.subtasks) {
                if (
                    todo.subtasks.every(({ progress }) => progress === "done")
                ) {
                    yield* exe(journalFx)(todo, todo.fromd)
                    return
                }

                const subtodos = todo.subtasks.filter(
                    subtask => subtask.progress !== "done",
                )
                todo = subtodos[0]
            }
        }

        todo = { ...todo, action, dryRun }

        if (todo.progress === "overrun") {
            const obsidianPath = todo.fromd.path
                .replace(`${vaultPath}/`, "")
                .replace(".md", "")
            yield* exe(announceFx)(
                Duration.minutes(1),
                `'${todo.description}' is taking too long. Break it down into subtasks.`,
            )
            yield* exe(obsidianFx)(obsidianPath)

            return
        }

        yield* exe(doFx)(todo, todo.fromd)
    })
