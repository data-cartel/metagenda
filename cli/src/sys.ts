import * as platform from "@effect/platform"

export const std = (command: platform.Command.Command) =>
    command.pipe(
        platform.Command.stdout("inherit"),
        platform.Command.stderr("inherit"),
        platform.Command.stdin("inherit"),
        platform.Command.exitCode,
    )

export const $ = (command: string): platform.Command.Command => {
    const cmd = command.split(" ")
    return platform.Command.make(cmd[0], ...cmd.slice(1))
}

export const sh = (command: string) => platform.Command.lines($(command))

export const reposPath = `${process.env.HOME}/code/0xgleb`
export const vaultPath = `${reposPath}/vault`

export const editCmd = (path: string) =>
    platform.Command.make("emacsclient", "-nw", "-r", path).pipe(std)

export const obsidianFx = (notePath: string) =>
    platform.Command.make("obs", "open", notePath).pipe(std)
