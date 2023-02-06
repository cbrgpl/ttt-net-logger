interface IRequest {
  method: string;
  url: string;
  mode?: RequestMode;
  headers?: Record<string, string>;
  body?: any;
}

interface IResponse {
  headers: Record<string, string>;
  body?: any;
  type: ResponseType;
  statusText: string;
  status: number;
}

export interface IBaseLog {
  request: IRequest;
  response: IResponse;
  userAgent: string;
}
