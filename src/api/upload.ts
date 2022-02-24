import { tixteClient, sendJSON } from "utils/server";
import { Buffer } from "buffer";

import type { Handler } from "@netlify/functions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return sendJSON({ error: "Method Not Allowed" }, { statusCode: 405 });
  }

  if (!event.body) {
    return sendJSON({ error: "No file" }, { statusCode: 400 });
  }

  const {
    data: { url, direct_url },
  } = await tixteClient.uploadFile(Buffer.from(event.body, "base64"), {
    extension: "gif",
  });

  return sendJSON({ url, direct_url });
};
