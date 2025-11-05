import { SendIngestLogUseCase } from "../../app/useCases/sendIngestLog";
import { SendIngestLogController } from "../../infra/controllers/sendIngestLogController";
import { IngestLogGateway } from "../../infra/gateway/ingestLog";

const ingestLogGateway = new IngestLogGateway();
const sendIngestLogUseCase = new SendIngestLogUseCase(ingestLogGateway);
const sendIngestLogController = new SendIngestLogController(
  sendIngestLogUseCase
);

const sendIngestLog = {
  handle: sendIngestLogController.handle.bind(sendIngestLogController),
};

export { sendIngestLog };
