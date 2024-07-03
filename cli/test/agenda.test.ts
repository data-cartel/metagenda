import { NodeSdk } from "@effect/opentelemetry"
import { NodeContext } from "@effect/platform-node"
import { Effect } from "effect"
import { it } from "@effect/vitest"
import {
    SimpleSpanProcessor,
    InMemorySpanExporter,
} from "@opentelemetry/sdk-trace-base"

import { metagendaFx } from "../src/agenda"

const TracingLive = NodeSdk.layer(
    Effect.sync(() => ({
        resource: {
            serviceName: "test",
        },
        spanProcessor: [new SimpleSpanProcessor(new InMemorySpanExporter())],
    })),
)

it.live("should work", () =>
    Effect.gen(function* () {
        yield* metagendaFx(true)
    }).pipe(
        Effect.provide(TracingLive),
        Effect.provide(NodeContext.layer),
        // NodeRuntime.runMain,
    ),
)
