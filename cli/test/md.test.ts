import { NodeSdk } from "@effect/opentelemetry"
import { NodeContext } from "@effect/platform-node"
import { Effect } from "effect"
import { expect } from "vitest"
import { it } from "@effect/vitest"
import {
    SimpleSpanProcessor,
    InMemorySpanExporter,
} from "@opentelemetry/sdk-trace-base"

import { fileTodosFx, fromRaw, taskMd, updMd } from "../src/md"
import { cfgFx } from "../src/cfg"

const TracingLive = NodeSdk.layer(
    Effect.sync(() => ({
        resource: {
            serviceName: "test",
        },
        spanProcessor: [new SimpleSpanProcessor(new InMemorySpanExporter())],
    })),
)

it.effect("works on individual tasks", () =>
    Effect.gen(function* () {
        const cfg = yield* cfgFx()
        const todos = yield* fileTodosFx(`${__dirname}/backlog.md`)
        expect(todos.length).toBeGreaterThan(0)
        for (const todo of todos) {
            const { raw, lineNum, path } = todo.fromd
            const reraw = taskMd(fromRaw(cfg, raw, lineNum, path))
            expect(reraw).toBe(raw.trimEnd())
        }
    }).pipe(
        Effect.provide(TracingLive),
        Effect.provide(NodeContext.layer),
        // NodeRuntime.runMain,
    ),
)

it.effect("works on backlog files", () =>
    Effect.gen(function* () {
        const todos = yield* fileTodosFx(`${__dirname}/backlog.md`)
        expect(todos.length).toBeGreaterThan(0)
        for (const todo of todos) {
            const { fileBefore, fileAfter } = updMd(todo)
            expect(fileAfter).toBe(fileBefore)
        }
    }).pipe(
        Effect.provide(TracingLive),
        Effect.provide(NodeContext.layer),
        // NodeRuntime.runMain,
    ),
)

it.effect("works on daily agendas", () =>
    Effect.gen(function* () {
        const todos = yield* fileTodosFx(`${__dirname}/daily.md`)
        expect(todos.length).toBeGreaterThan(0)
        for (const todo of todos) {
            expect(todo.startTime).toBeDefined()
            expect(todo.endTime).toBeDefined()
            const { fileBefore, fileAfter } = updMd(todo)
            expect(fileAfter).toBe(fileBefore)
        }
    }).pipe(
        Effect.provide(TracingLive),
        Effect.provide(NodeContext.layer),
        // NodeRuntime.runMain,
    ),
)
