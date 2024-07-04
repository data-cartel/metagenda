import { NodeSdk } from "@effect/opentelemetry"
import { NodeContext } from "@effect/platform-node"
import { Effect } from "effect"
import { expect } from "vitest"
import { it } from "@effect/vitest"
import {
    SimpleSpanProcessor,
    InMemorySpanExporter,
} from "@opentelemetry/sdk-trace-base"

const TracingLive = NodeSdk.layer(
    Effect.sync(() => ({
        resource: {
            serviceName: "test",
        },
        spanProcessor: [new SimpleSpanProcessor(new InMemorySpanExporter())],
    })),
)

it.effect("placeholder", () =>
    Effect.sync(() => {
        expect(1).toBe(1)
    }).pipe(
        Effect.provide(TracingLive),
        Effect.provide(NodeContext.layer),
        // NodeRuntime.runMain,
    ),
)
