import * as platform from "@effect/platform"
import { Effect, Duration } from "effect"
import * as fs from "fs"

import { today } from "./time"
import { $, std, vaultPath } from "./sys"
import { LineOfWork, fmtLineOfWork } from "./todo"

export const castPath = ({ project, qualifier }: LineOfWork) => {
    if (qualifier) {
        const chunks = [project as string, [...qualifier]]
        const name = chunks.pop()

        const dir = `${vaultPath}/recordings/${chunks.join("/")}`
        fs.mkdirSync(dir, { recursive: true })

        return `${dir}/${name}.cast`
    } else {
        const name = today()
        const dir = `${vaultPath}/recordings/${project}`
        fs.mkdirSync(dir, { recursive: true })

        return `${dir}/${name}.cast`
    }
}

export const zessionFx = (
    lineOfWork: LineOfWork,
    duration: Duration.Duration,
) =>
    platform.Command.pipeTo(
        platform.Command.make(
            "echo",
            "'zellij",
            "attach",
            "-fc",
            `${lineOfWork.project}'`,
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
            castPath(lineOfWork),
            "-c",
        ),
    ).pipe(std, Effect.withSpan(`zession #${fmtLineOfWork(lineOfWork)}`))

export const playbackFx = (
    lineOfWork: LineOfWork | undefined,
    speed: number,
) =>
    !lineOfWork
        ? Effect.void
        : $(`asciinema play -i 1 -s ${speed} ${castPath(lineOfWork)}`).pipe(
              std,
              Effect.withSpan(`playback #${fmtLineOfWork(lineOfWork)}`),
          )
