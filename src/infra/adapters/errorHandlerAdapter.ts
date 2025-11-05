import { errorHandler } from "@arkyn/server";

class ErrorHandlerAdapter {
  static handle(error: any) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return errorHandler(error);
  }
}

export { ErrorHandlerAdapter };
