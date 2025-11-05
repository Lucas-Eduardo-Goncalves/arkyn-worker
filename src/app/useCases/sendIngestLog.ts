import { IngestLogGatewayDTO } from "../../domain/gateway/ingestLog";
import { HttpMethod } from "../../main/types/httpMethod";

type InputProps = {
  domainUrl: string;
  pathnameUrl: string;
  trafficSourceId: string;
  status: number;
  token: string;
  protocol: "http" | "https";
  method: HttpMethod;
  trafficUserId: string | null;
  requestHeaders: string;
  requestBody: string | null;
  queryParams: string;
  responseHeaders: string;
  responseBody: string | null;
  elapsedTime: number;
};

class SendIngestLogUseCase {
  constructor(private ingestLogGateway: IngestLogGatewayDTO) {}

  async execute(input: InputProps) {
    const { trafficSourceId, token, ...body } = input;
    await this.ingestLogGateway.sendIngestLog(body, trafficSourceId, token);
    return;
  }
}

export { SendIngestLogUseCase };
