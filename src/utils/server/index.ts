/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Client } from "./tixte";

export const tixteClient = new Client(process.env.TIXTE_API_KEY!, {
  defaultURL: "ultirequiem.is-from.space",
});

export function sendJSON<T>(
  data: T,
  opt: { statusCode?: number; headers?: { [key: string]: string } } = {}
) {
  const config = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    ...opt,
  };

  return {
    statusCode: config.statusCode,
    headers: {
      ...config.headers,
    },
    body: JSON.stringify(data),
  };
}
