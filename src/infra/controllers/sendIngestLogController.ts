import { SendIngestLogUseCase } from "../../app/useCases/sendIngestLog";
import { ErrorHandlerAdapter } from "../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { ingestLogSchema } from "../schemas/ingestLog";

class SendIngestLogController {
  constructor(private sendIngestLogUseCase: SendIngestLogUseCase) {}

  async handle(input: string, queueId: string) {
    const startTime = Date.now();
    try {
      const parsedInput = JSON.parse(input);
      const schemaValidator = new SchemaValidatorAdapter(ingestLogSchema);

      const data = schemaValidator.validate(parsedInput);
      await this.sendIngestLogUseCase.execute(data);

      const timestamp = `${Date.now() - startTime}ms`;
      console.log(`\x1b[35mWORKED:${timestamp}ms\x1b[0m => /queue/${queueId}`);
    } catch (error) {
      const timestamp = `${Date.now() - startTime}ms`;
      console.log(`\x1b[31mFAILED:${timestamp}ms\x1b[0m => /queue/${queueId}`);
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { SendIngestLogController };
