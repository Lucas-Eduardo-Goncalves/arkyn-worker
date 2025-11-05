import { ApiService } from "@arkyn/server";
import { environmentVariables } from "../../main/config/environmentVariables";

const microStore = new ApiService({
  baseUrl: environmentVariables.MICRO_STORE_URL,
  enableDebug: process.env.NODE_ENV === "development",
});

export { microStore };
