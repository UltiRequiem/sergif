/* eslint-disable @typescript-eslint/no-explicit-any */

export interface NetlifyContext {
  callbackWaitsForEmptyEventLoop: boolean;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  identity?: {
    [key: string]: any;
  };
  clientContext?: {
    [key: string]: any;
  };
  getRemainingTimeInMillis(): number;
  /** @deprecated Use handler callback or promise result */
  done(error?: Error, result?: any): void;
  /** @deprecated Use handler callback with first argument or reject a promise result */
  fail(error: Error | string): void;
  /** @deprecated Use handler callback with second argument or resolve a promise result */
  succeed(messageOrObject: any): void;
  /** @deprecated Use handler callback or promise result */
  succeed(message: string, object: any): void;
}

interface EventHeaders {
  [name: string]: string | undefined;
}
interface EventMultiValueHeaders {
  [name: string]: string[] | undefined;
}
interface EventQueryStringParameters {
  [name: string]: string | undefined;
}
interface EventMultiValueQueryStringParameters {
  [name: string]: string[] | undefined;
}

export interface NetlifyEvent {
  rawUrl: string;
  rawQuery: string;
  path: string;
  httpMethod: string;
  headers: EventHeaders;
  multiValueHeaders: EventMultiValueHeaders;
  queryStringParameters: EventQueryStringParameters | null;
  multiValueQueryStringParameters: EventMultiValueQueryStringParameters | null;
  body: string | null;
  isBase64Encoded: boolean;
}

export interface Handler<T = { [key: string]: any }> {
  (event: NetlifyEvent, context: NetlifyContext): void | Promise<T>;
}

export function createHandler(
  method: "GET" | "POST" | "PUT" | "DELETE",
  handler: Handler,
  config: { headers?: EventHeaders; bodyRequired?: boolean } = {}
) {
  const parsedHandler: Handler = async (event, context) => {
    const defaultConfig = {
      headers: { "Content-Type": "application/json" },
      ...config,
    };

    if (event.httpMethod !== method) {
      return {
        body: JSON.stringify({ error: "Method Not Allowed" }),
        statusCode: 405,
        headers: defaultConfig.headers,
      };
    }

    if (!event.body) {
      return { error: "No body", statusCode: 400 };
    }

    const response = await handler(event, context);

    if (!response) {
      return { statusCode: 204, body: JSON.stringify({ statusCode: 204 }) };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const statusCode = response["statusCode"] ?? 200;

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      statusCode,
      headers: defaultConfig.headers,
      body: JSON.stringify(response),
    };
  };

  return parsedHandler;
}
