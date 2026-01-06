import { Hono } from "hono";
import { hostname } from "os";
import { name, version } from "../package.json";
import { QueueService } from "./infra/services/queueService";
import { environmentVariables } from "./main/config/environmentVariables";
import { deleteLogFromStorage } from "./main/factories/deleteLogFromStorageFactory";
import { processLogForStorage } from "./main/factories/processLogForStorageFactory";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";

const app = new Hono();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) => {
  const message = `Service ${name} is healthy on container ${hostname()} using version ${version}`;
  return c.text(message);
});

await QueueService.initialize();

const ingestConsumer = await QueueService.createConsumer("ingest-logs");
const deleteConsumer = await QueueService.createConsumer("cleanup-logs");

Promise.all([
  QueueService.run(ingestConsumer, async (message, key) => {
    await processLogForStorage.handle(message, key);
  }),
  QueueService.run(deleteConsumer, async (logId) => {
    await deleteLogFromStorage.handle(logId);
  }),
]);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
