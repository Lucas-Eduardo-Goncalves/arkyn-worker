import {
  BadRequest,
  Conflict,
  Forbidden,
  NotFound,
  ServerError,
  Unauthorized,
} from "@arkyn/server";

class HttpAdapter {
  static badRequest(message: string, cause?: any) {
    throw new BadRequest(message, cause);
  }

  static serverError(message: string, cause?: any) {
    throw new ServerError(message, cause);
  }

  static notFound(message: string, cause?: any) {
    throw new NotFound(message, cause);
  }

  static conflict(message: string, cause?: any) {
    throw new Conflict(message, cause);
  }

  static unauthorized(message: string, cause?: any) {
    throw new Unauthorized(message, cause);
  }

  static forbidden(message: string, cause?: any) {
    throw new Forbidden(message, cause);
  }
}

export { HttpAdapter };
