import { Client } from "./tixte";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const tixteClient = new Client(process.env.TIXTE_API_KEY!, {
  defaultURL: "sergif.likes.cash",
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
    ...config,
    body: JSON.stringify(data),
  };
}
