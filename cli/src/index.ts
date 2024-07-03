import { Command } from "@effect/cli"
import * as fxCli from "@effect/cli"
import {
  NodeFileSystem,
  NodeContext,
  NodeRuntime,
  NodeTerminal,
} from "@effect/platform-node"
import { Effect, Console, Option } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base"

import { DurationSetting, cfgCli, cfgFx } from "./cfg"
import { Todo, LineOfWork, inLineWith } from "./todo"
import { FileSpanExporter, exportFx, logger } from "./log"
import { doFx, flattenTodo, planCli, vaultodosFx, upgradeCli } from "./md"
import { metagendaFx } from "./agenda"

const dryRunOpt = fxCli.Options.boolean("dry-run").pipe(
  fxCli.Options.withDefault(false),
)

const lineOfWorkArg = fxCli.Args.text({ name: "lineOfWork" })
const flattenOpt = fxCli.Options.boolean("flatten").pipe(
  fxCli.Options.withDefault(false),
)

const doCli = Command.make(
  "do",
  { lineOfWorkArg, dryRunOpt },
  ({ lineOfWorkArg: lineOfWorkStr, dryRunOpt: dryRun }) =>
    Effect.gen(function* () {
      const lineOfWork = LineOfWork(lineOfWorkStr)
      const cfg = yield* cfgFx
      yield* doFx({
        ...Todo(
          lineOfWork,
          `$ metagenda do ${lineOfWorkStr}`,
          DurationSetting(cfg["hack" as const])!,
        ),
        dryRun,
      })
    }),
)

const todosCli = Command.make(
  "todos",
  { lineOfWork: lineOfWorkArg.pipe(fxCli.Args.optional), flatten: flattenOpt },
  ({ lineOfWork, flatten }) =>
    Effect.gen(function* () {
      const todos = yield* Option.match(lineOfWork, {
        onNone: () => vaultodosFx(),
        onSome: lineOfWork =>
          vaultodosFx(todo =>
            inLineWith(LineOfWork(lineOfWork))(todo.lineOfWork),
          ),
      })

      const out = flatten ? todos : todos.flatMap(flattenTodo)
      for (const todo of out) yield* Console.log(JSON.stringify(todo))
    }),
)

const metagendaCli = Command.make(
  "metagenda",
  { dryRun: dryRunOpt },
  ({ dryRun }) => metagendaFx(dryRun),
)

const exportCli = Command.make("export", {}, () => exportFx)

const cli = metagendaCli.pipe(
  Command.withSubcommands([
    doCli,
    planCli,
    todosCli,
    exportCli,
    cfgCli,
    upgradeCli,
  ]),
)

const app = Command.run(cli, {
  name: "metagenda - autobiography as code",
  version: "v0.1.0",
})

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "metagenda-cli" },
  spanProcessor: new SimpleSpanProcessor(new FileSpanExporter()),
}))

app(process.argv).pipe(
  Effect.provide(logger),
  Effect.provide(NodeSdkLive),
  Effect.provide(NodeFileSystem.layer),
  Effect.provide(NodeTerminal.layer),
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
)
