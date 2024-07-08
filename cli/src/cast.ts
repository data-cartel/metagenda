import * as platform from "@effect/platform"
import { Effect, Duration } from "effect"
import * as fs from "fs"

import { today } from "./time"
import { $, std } from "./sys"
import { LineOfWork, splitLineOfWork } from "./todo"
import { cfgFx } from "./cfg"

export const castPathFx = (lofw: LineOfWork) =>
    Effect.gen(function* () {
        const { vaultPath } = yield* cfgFx()
        const name = today()
        const dir = `${vaultPath}/recordings/${lofw}`
        fs.mkdirSync(dir, { recursive: true })
        return `${dir}/${name}.cast`
    })

export const zessionFx = (
    lineOfWork: LineOfWork,
    duration: Duration.Duration,
) =>
    Effect.gen(function* () {
        const castPath = yield* castPathFx(lineOfWork)

        const { project } = splitLineOfWork(lineOfWork)
        yield* platform.Command.pipeTo(
            platform.Command.make(
                "echo",
                "'zellij",
                "attach",
                "-fc",
                `${project}'`,
            ),
            platform.Command.make(
                "xargs",
                "timeout",
                "--foreground",
                "-k",
                "1s",
                Duration.format(duration),
                "asciinema",
                "rec",
                "-i",
                "1",
                "--append",
                castPath,
                "-c",
            ),
        ).pipe(std)
    }).pipe(Effect.withSpan(`zession #${lineOfWork}`))

export const playbackFx = (lineOfWork: LineOfWork | undefined, speed: number) =>
    Effect.gen(function* () {
        if (!lineOfWork) return
        const castPath = yield* castPathFx(lineOfWork)
        yield* $(`asciinema play -i 1 -s ${speed} ${castPath}`).pipe(std)
    }).pipe(Effect.withSpan(`playback #${lineOfWork}`))
