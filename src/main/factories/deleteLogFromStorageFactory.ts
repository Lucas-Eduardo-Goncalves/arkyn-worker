import { DeleteLogFromStorageUseCase } from "../../app/useCases/deleteLogFromStorageUseCase";
import { DeleteLogFromStorageController } from "../../infra/controllers/deleteLogFromStorageController";
import { ApiStorageService } from "../../infra/services/storageService";

const apiStorageService = new ApiStorageService();
const deleteLogFromStorageUseCase = new DeleteLogFromStorageUseCase(
  apiStorageService
);
const deleteLogFromStorageController = new DeleteLogFromStorageController(
  deleteLogFromStorageUseCase
);

const deleteLogFromStorage = {
  handle: deleteLogFromStorageController.handle.bind(
    deleteLogFromStorageController
  ),
};

export { deleteLogFromStorage };
