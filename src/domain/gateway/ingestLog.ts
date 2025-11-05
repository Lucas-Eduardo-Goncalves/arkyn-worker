type SendIngestLogInput = {
  domainUrl: string;
  pathnameUrl: string;
  status: number;
  protocol: "http" | "https";
  method: "get" | "post" | "put" | "delete" | "patch";
  trafficUserId: string | null;
  elapsedTime: number;
  requestHeaders: string;
  requestBody: string | null;
  queryParams: string;
  responseHeaders: string;
  responseBody: string | null;
};

type IngestLogGatewayDTO = {
  sendIngestLog: (
    data: SendIngestLogInput,
    trafficSourceId: string,
    token: string
  ) => Promise<void>;
};

export { IngestLogGatewayDTO, SendIngestLogInput };
