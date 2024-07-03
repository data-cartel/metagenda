import * as fs from "fs"
import * as cli from "@effect/cli"
import { Duration, Effect, Match, Option } from "effect"
import YAML from "yaml"

import { reposPath } from "./sys"
import { today } from "./time"
import { Action } from "./todo"

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

export type Cfg = Record<Action, DurationSetting> & {
    spamSecs: number
    spamDelayMs: number
    obsEnabled: boolean
    planPlaybackSpeed: number
    journalPlaybackSpeed: number
}

export const cfgCli = cli.Command.make(
    "cfg",
    { path: cli.Args.text({ name: "path" }).pipe(cli.Args.optional) },
    ({ path }) =>
        Effect.gen(function* () {
            const cfg = yield* Option.match(path, {
                onNone: () => cfgFx,
                onSome: (path: string) => loadCfgFx(path),
            })
            console.log(JSON.stringify(cfg, null, 2))
            if ("hack" in cfg) {
                console.log(cfg.hack)
                console.log(DurationSetting(cfg.hack))
            }
        }),
)

const loadCfgFx = (path: string) =>
    Effect.sync<Cfg>(() => {
        const lines = fs.readFileSync(path, "utf8").split("\n")

        const frontMatterEnd = lines.indexOf("---", 1)
        const frontMatter = lines.slice(1, frontMatterEnd).join("\n")

        const parsed = YAML.parse(frontMatter, { strict: false }) as Cfg
        return parsed
    })

export const cfgFx = Effect.gen(function* () {
    const global = yield* loadCfgFx(`${reposPath}/vault/cfg.md`)
    const daily = yield* loadCfgFx(`${reposPath}/vault/daily/${today()}.md`)
    return { ...global, ...daily }
})
