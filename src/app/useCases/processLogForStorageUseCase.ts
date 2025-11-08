import { HttpMethod } from "../../main/types/httpMethod";
import { StorageService } from "../../domain/services/storageService";

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

class ProcessLogForStorageUseCase {
  constructor(private storageService: StorageService) {}

  async execute(input: InputProps) {
    const { trafficSourceId, token, ...body } = input;
    await this.storageService.sendLog(body, trafficSourceId, token);
    return;
  }
}

export { ProcessLogForStorageUseCase };
