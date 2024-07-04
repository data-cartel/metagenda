import {
  NodeFileSystem,
  NodeContext,
  NodeRuntime,
  NodeTerminal,
} from "@effect/platform-node"
import { Effect, Logger, LogLevel } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base"
import dotenv from "dotenv"
import { Bot } from "grammy"

const logger = Logger.minimumLogLevel(LogLevel.Debug)

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "metagenda-cli" },
  spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
}))

export const botFx = Effect.tryPromise(async () => {
  dotenv.config()

  if (!process.env.BOTOKEN) {
    console.error(
      "Please provide a bot token in the BOTOKEN environment variable.",
    )
    process.exit(1)
  }

  // Create an instance of the `Bot` class and pass your bot token to it.
  const bot = new Bot(process.env.BOTOKEN)

  // You can now register listeners on your bot object `bot`.
  // grammY will call the listeners when users send messages to your bot.

  // Handle the /start command.
  bot.command("start", ctx => ctx.reply("Welcome! Up and running."))
  // Handle other messages.
  bot.on("message", ctx => ctx.reply("Got another message!"))

  // Now that you specified how to handle messages, you can start your bot.
  // This will connect to the Telegram servers and wait for messages.

  // Start the bot.
  await bot.start()
})

botFx.pipe(
  Effect.provide(logger),
  Effect.provide(NodeSdkLive),
  Effect.provide(NodeFileSystem.layer),
  Effect.provide(NodeTerminal.layer),
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
)
