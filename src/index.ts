import { Hono } from "hono";
import { hostname } from "os";
import { name, version } from "../package.json";
import { QueueService } from "./infra/services/queueService";
import { environmentVariables } from "./main/config/environmentVariables";
import { sendIngestLog } from "./main/factories/sendIngestLogFactory";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";

const app = new Hono();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) => {
  const message = `Service ${name} is healthy on container ${hostname()} using version ${version}`;
  return c.text(message);
});

await QueueService.initialize();
await QueueService.subscribe("ingest-logs");
await QueueService.run(async (message, key) => {
  await sendIngestLog.handle(message, key);
});

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
