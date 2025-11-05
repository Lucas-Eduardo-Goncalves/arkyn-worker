import { SchemaValidator } from "@arkyn/server";
import z, { Schema } from "zod";

class SchemaValidatorAdapter<T extends Schema> {
  constructor(readonly schema: T) {}

  validate(data: object): z.infer<T> {
    const schemaValidator = new SchemaValidator(this.schema as any);
    return schemaValidator.formValidate(data);
  }
}

export { SchemaValidatorAdapter };
