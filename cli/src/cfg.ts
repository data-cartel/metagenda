import * as fs from "fs"
import * as cli from "@effect/cli"
import { Duration, Effect, Match, Option } from "effect"
import YAML from "yaml"

import { Action, LineOfWork } from "./todo"

export type Project = string & { readonly __tag: unique symbol }

export const Project = (project: string): Project =>
    Match.value(project).pipe(
        Match.when("x23ai", () => "x23.ai" as Project),
        Match.orElse(() => project as Project),
    )

export type DurationSetting =
    | { millis: number }
    | { seconds: number }
    | { minutes: number }
    | { hours: number }

export const DurationSetting = (
    setting: unknown,
): Duration.Duration | undefined => {
    if (!setting || typeof setting !== "object") return undefined

    const parsedOrNull = (
        key: keyof DurationSetting,
        mk: (num: number) => Duration.Duration,
    ) => {
        if (!(key in setting)) return undefined

        const value = (setting as Record<string, unknown>)[key]
        if (!(key in setting)) return undefined

        if (typeof value === "number") return mk(value)
        if (typeof value === "string") return mk(parseInt(value))

        return undefined
    }

    const millis = "millis" as keyof DurationSetting
    const seconds = "seconds" as keyof DurationSetting
    const minutes = "minutes" as keyof DurationSetting
    const hours = "hours" as keyof DurationSetting

    return (
        parsedOrNull(millis, Duration.millis) ??
        parsedOrNull(seconds, Duration.seconds) ??
        parsedOrNull(minutes, Duration.minutes) ??
        parsedOrNull(hours, Duration.hours) ??
        undefined
    )
}

export type ActionsCfg = Record<Action, DurationSetting>

export interface LineOfWorkCfg {
    repoPath?: string
}

// TODO: this should either use Project as the key or have a way
// of loading values from less qualified configs if no exact
// matches were found for the full line of work path
export type LineOfWorkCfgs = Record<LineOfWork, LineOfWorkCfg>

export type Cfg = ActionsCfg &
    LineOfWorkCfgs & {
        spamSecs: number
        spamDelayMs: number
        obsEnabled: boolean
        planPlaybackSpeed: number
        journalPlaybackSpeed: number
        vaultPath: string
    }

export const cfgFx = (customPath?: string) =>
    Effect.sync<Cfg>(() => {
        const homeCfgPath = `${process.env.HOME}/.config/metagenda.yaml`
        const path =
            customPath ??
            (process.title.includes("vitest")
                ? `${__dirname}/../test/metagenda.yaml`
                : homeCfgPath)

        // TODO: use Effect's type-safe error handling
        if (!fs.existsSync(path))
            throw new Error(`Config file not found: ${path}`)

        const contents = fs.readFileSync(path, "utf8")
        return YAML.parse(contents, { strict: false }) as Cfg
    })

export const cfgCli = cli.Command.make(
    "cfg",
    { path: cli.Args.text({ name: "path" }).pipe(cli.Args.optional) },
    ({ path }) =>
        Effect.gen(function* () {
            const cfg = yield* Option.match(path, {
                onNone: () => cfgFx(),
                onSome: (path: string) => cfgFx(path),
            })
            console.log(JSON.stringify(cfg, null, 2))
            if ("hack" in cfg) {
                console.log(cfg.hack)
                console.log(DurationSetting(cfg.hack))
            }
        }),
)
