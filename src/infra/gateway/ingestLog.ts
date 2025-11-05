import {
  IngestLogGatewayDTO,
  SendIngestLogInput,
} from "../../domain/gateway/ingestLog";
import { microStore } from "../http/microAuth";

class IngestLogGateway implements IngestLogGatewayDTO {
  async sendIngestLog(
    body: SendIngestLogInput,
    trafficSourceId: string,
    token: string
  ): Promise<void> {
    const url = `/http-traffic-records/${trafficSourceId}`;
    await microStore.post(url, { body, token });

    return;
  }
}

export { IngestLogGateway };
