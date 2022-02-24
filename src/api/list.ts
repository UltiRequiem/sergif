/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { tixteClient, sendJSON } from "utils/server";

import type { Handler } from "@netlify/functions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return sendJSON({ error: "Method Not Allowed" }, { statusCode: 405 });
  }

  if (!event.body) {
    return sendJSON({ error: "No body" }, { statusCode: 400 });
  }

  const { page, amount } = JSON.parse(event.body) as Record<
    string,
    number | undefined
  >;

  if (!page) {
    return sendJSON({ error: "Missing page" }, { statusCode: 400 });
  }

  const { data } = await tixteClient.uploads(page, amount ?? 3);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const urls = data.uploads?.map(
    ({ domain, name, extension }: Record<string, string>) =>
      `https://${domain}/r/${name}.${extension}`
  );

  return sendJSON(urls);
};
