import { ProcessLogForStorageUseCase } from "../../app/useCases/processLogForStorageUseCase";
import { ProcessLogForStorageController } from "../../infra/controllers/processLogForStorageController";
import { ApiStorageService } from "../../infra/services/storageService";

const apiStorageService = new ApiStorageService();
const processLogForStorageUseCase = new ProcessLogForStorageUseCase(
  apiStorageService
);
const processLogForStorageController = new ProcessLogForStorageController(
  processLogForStorageUseCase
);

const processLogForStorage = {
  handle: processLogForStorageController.handle.bind(
    processLogForStorageController
  ),
};

export { processLogForStorage };
