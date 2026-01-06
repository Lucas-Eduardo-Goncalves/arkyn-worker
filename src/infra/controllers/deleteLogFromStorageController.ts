import { DeleteLogFromStorageUseCase } from "../../app/useCases/deleteLogFromStorageUseCase";
import { ErrorHandlerAdapter } from "../adapters/errorHandlerAdapter";

class DeleteLogFromStorageController {
  constructor(
    private deleteLogFromStorageUseCase: DeleteLogFromStorageUseCase
  ) {}

  async handle(logId: string) {
    const startTime = Date.now();
    try {
      await this.deleteLogFromStorageUseCase.execute({ id: logId });
      const timestamp = `${Date.now() - startTime}ms`;
      console.log(
        `\x1b[35mDELETED:${timestamp}ms\x1b[0m => /delete-log/${logId}`
      );
    } catch (error) {
      const timestamp = `${Date.now() - startTime}ms`;
      console.log(
        `\x1b[31mFAILED:${timestamp}ms\x1b[0m => /delete-log/${logId}`
      );
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteLogFromStorageController };
