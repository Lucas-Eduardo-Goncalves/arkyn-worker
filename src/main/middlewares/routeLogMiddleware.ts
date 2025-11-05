import { Context, Next } from "hono";

class RouteLogMiddleware {
  private static getMethodColored(
    method: string,
    timestamp: string,
    url: string
  ) {
    let returnLog = "";

    switch (method.toLowerCase()) {
      case "get":
        returnLog = `\x1b[32mGET:${timestamp}\x1b[0m`; // Green
        break;
      case "post":
        returnLog = `\x1b[34mPOST:${timestamp}\x1b[0m`; // Blue
        break;
      case "put":
        returnLog = `\x1b[33mPUT:${timestamp}\x1b[0m`; // Yellow
        break;
      case "delete":
        returnLog = `\x1b[31mDELETE:${timestamp}\x1b[0m`; // Red
        break;
      case "patch":
        returnLog = `\x1b[35mPATCH:${timestamp}\x1b[0m`; // Magenta
        break;
    }

    console.log(`${returnLog} => ${url}`);
  }

  private static formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${ms.toFixed(2)}ms`;
    } else {
      return `${(ms / 1000).toFixed(2)}s`;
    }
  }

  static async logRoute(c: Context, next: Next) {
    const url = new URL(c.req.url).pathname;
    const method = c.req.method;

    const startTime = performance.now();

    await next();

    const endTime = performance.now();
    const duration = Math.abs(endTime - startTime); // Garantir valor positivo
    const formattedDuration = this.formatDuration(duration);

    this.getMethodColored(method, formattedDuration, url);
  }
}

export { RouteLogMiddleware };
