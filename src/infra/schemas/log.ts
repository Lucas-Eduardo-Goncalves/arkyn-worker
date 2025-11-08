import { z } from "zod";

function validatePathname(pathname: string): boolean {
  try {
    new URL(`http://example.com${pathname}`);
    return true;
  } catch (error) {
    return false;
  }
}

const logSchema = z.object({
  domainUrl: z
    .string()
    .min(1, "Domain url is required")
    .url("Invalid URL format"),
  pathnameUrl: z
    .string()
    .min(1, "Pathname url is required")
    .regex(/^\//, "Pathname must start with /")
    .refine(validatePathname, "Invalid pathname format"),
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  token: z.string().min(1, "Token is required"),
  status: z.number().int("Status must be an integer"),
  protocol: z.enum(["http", "https"]),
  method: z.enum(["get", "post", "put", "delete", "patch"]),
  trafficUserId: z.string().uuid("Invalid traffic user id format").nullable(),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  requestHeaders: z.string().min(1, "Request headers cannot be empty"),
  requestBody: z.string().nullable(),
  queryParams: z.string().min(1, "Query params cannot be empty"),
  responseHeaders: z.string().min(1, "Response headers cannot be empty"),
  responseBody: z.string().nullable(),
});

export { logSchema };
