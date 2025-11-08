import {
  SendLogInput,
  StorageService,
} from "../../domain/services/storageService";
import { microStore } from "../http/microAuth";

class ApiStorageService implements StorageService {
  async sendLog(
    body: SendLogInput,
    trafficSourceId: string,
    token: string
  ): Promise<void> {
    const url = `/http-traffic-records/${trafficSourceId}`;
    await microStore.post(url, { body, token });

    return;
  }
}

export { ApiStorageService };
